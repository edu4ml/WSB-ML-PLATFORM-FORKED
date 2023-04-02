from dataclasses import dataclass
from typing import List
from uuid import UUID

from infra.command import Command
from infra.exceptions import (
    CommandBusException,
)
from shared.enums import ApiErrors, CommandTypes, UserRoles, CourseComponentType
from db.repository.configuration import RepositoryRoot
from elearning.coursing.entities import CourseStep
from infra.command_handler import CommandHandler
from infra.event import Event


@dataclass
class UpdateCourseStepType:
    order: int
    id: UUID
    type: CourseComponentType


@dataclass
class UpdateCourse(Command):
    title: str | None = None
    description: str | None = None
    is_draft: bool | None = None

    steps: List[UpdateCourseStepType] | None = None

    class Meta:
        name = CommandTypes.UPDATE_COURSE
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        command = UpdateCourse(
            parent_uuid=kwargs["course_uuid"],
            description=request.data.get("description"),
            is_draft=request.data.get("is_draft"),
            steps=request.data.get("steps"),
        )
        command.issuer = request.user
        return command


class OnUpdateCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: UpdateCourse):
        course = self.repository.course.get_by_uuid(command.parent_uuid)
        if course is None:
            raise CommandBusException(ApiErrors.COURSE_DOES_NOT_EXIST, 400)

        self._validate_steps_payload(command.steps)
        self._check_that_user_is_author(course, command.issuer)
        self._check_course_is_not_published(course)

        course.description = command.description
        course.is_draft = command.is_draft

        if command.steps is not None:
            course.steps = [
                CourseStep(
                    uuid=None,
                    order=s["order"],
                    component=s["component"],
                    evaluation_type=s["evaluation_type"],
                )
                for s in command.steps
            ]
        self.repository.course.update_with_entity(course)

    def _check_that_user_is_author(self, course, user):
        if course.author != user.uuid and not user.is_admin():
            raise CommandBusException(ApiErrors.CANNOT_UPDATE_COURSE_NOT_AUTHOR, 403)

    def _check_course_is_not_published(self, course):
        if not course.is_draft:
            raise CommandBusException(ApiErrors.CANNOT_UPDATE_PUBLISHED_COURSE, 400)

    def _validate_steps_payload(self, steps):
        for step in steps:
            if step.get("component") is None:
                raise CommandBusException(
                    ApiErrors.CANNOT_UPDATE_COURSE_STEP_WITHOUT_COMPONENT, 400
                )
            if step.get("evaluation_type") is None:
                raise CommandBusException(
                    ApiErrors.CANNOT_UPDATE_COURSE_STEP_WITHOUT_EVALUATION_TYPE, 400
                )
            if step.get("order") is None:
                raise CommandBusException(
                    ApiErrors.CANNOT_UPDATE_COURSE_STEP_WITHOUT_ORDER, 400
                )
