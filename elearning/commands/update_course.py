from dataclasses import dataclass
from typing import List
from uuid import UUID
from elearning.entities.course_step import NewCourseStep

from infra.command import Command
from infra.exceptions import (
    CommandBusException,
)
from shared.enums import CommandTypes, UserRoles
from db.repository.configuration import RepositoryRoot
from infra.command_handler import CommandHandler
from infra.event import Event


@dataclass
class UpdateCourse(Command):
    course_uuid: UUID
    title: str | None = None
    description: str | None = None

    steps: List[NewCourseStep] | None = None

    class Meta:
        name = CommandTypes.UPDATE_COURSE
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        cls.validate(request.data)

        return UpdateCourse(
            issuer=request.user,
            course_uuid=request.data["course_uuid"],
            description=request.data.get("description"),
            steps=[
                NewCourseStep(
                    order=step["order"],
                    component=step["component"],
                    evaluation_type=step["evaluation_type"],
                )
                for step in request.data.get("steps")
            ],
        )

    @classmethod
    def validate(cls, payload):
        cls.validate_steps(payload.get("steps"))

    @classmethod
    def validate_steps(cls, steps):
        for step in steps:
            if step.get("component") is None:
                raise CommandBusException("Missing component uuid", 400)
            if step.get("evaluation_type") is None:
                raise CommandBusException("Missing evaluation type", 400)
            if step.get("order") is None:
                raise CommandBusException("Missing order", 400)


class OnUpdateCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: UpdateCourse):
        course = self.repository.course.get_by_uuid(command.course_uuid)
        if course is None:
            raise CommandBusException("Course does not exists", 404)

        self._check_that_user_is_author(course, command.issuer)
        self._check_course_is_not_published(course)

        course.description = command.description

        if command.steps is not None:
            self.repository.course.update_course_steps(course.uuid, command.steps)

        return self.repository.course.update_with_entity(course)

    def _check_that_user_is_author(self, course, user):
        if course.author != user.uuid and not user.is_admin():
            raise CommandBusException("Only author can update the course", 403)

    def _check_course_is_not_published(self, course):
        if not course.is_draft:
            raise CommandBusException("Cannot update already published course", 403)
