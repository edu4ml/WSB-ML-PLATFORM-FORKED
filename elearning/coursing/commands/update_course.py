from dataclasses import dataclass
from typing import List
from uuid import UUID

from infra.command import Command
from infra.exceptions import (
    CommandProcessingException,
    CommandProcessingForbiddenException,
)
from shared.enums import ApiErrors, CommandTypes, UserRoles, CourseStepComponentTypes
from db.repository.configuration import RepositoryRoot
from elearning.coursing.entities import CourseStep
from infra.command_handler import CommandHandler
from infra.event import Event


@dataclass
class UpdateCourseStepType:
    order: int
    id: UUID
    type: CourseStepComponentTypes


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
        course = self.repository.course.retrieve(command.parent_uuid)
        if course is None:
            raise CommandProcessingException(ApiErrors.COURSE_DOES_NOT_EXIST)
        self._validate_steps_payload(command.steps)
        self._check_that_user_is_author(course, command.issuer)
        self._check_course_is_not_published(course)

        with self.repository.course.with_entity(
            parent_uuid=command.parent_uuid
        ) as course:
            course.description = command.description
            course.is_draft = command.is_draft

            if command.steps is not None:
                course.steps = [
                    CourseStep(
                        order=s["order"],
                        component=s["component"],
                        evaluation_type=s["evaluation_type"],
                    )
                    for s in command.steps
                ]
            else:
                course.steps = None

    def _check_that_user_is_author(self, course, user):
        if course.author != user.uuid:
            raise CommandProcessingForbiddenException(
                ApiErrors.CANNOT_UPDATE_COURSE_NOT_AUTHOR
            )

    def _check_course_is_not_published(self, course):
        if not course.is_draft:
            raise CommandProcessingException(ApiErrors.CANNOT_UPDATE_PUBLISHED_COURSE)

    def _validate_steps_payload(self, steps):
        for step in steps:
            if step.get("component") is None:
                raise CommandProcessingException(
                    ApiErrors.CANNOT_UPDATE_COURSE_STEP_WITHOUT_COMPONENT
                )
            if step.get("evaluation_type") is None:
                raise CommandProcessingException(
                    ApiErrors.CANNOT_UPDATE_COURSE_STEP_WITHOUT_EVALUATION_TYPE
                )
            if step.get("order") is None:
                raise CommandProcessingException(
                    ApiErrors.CANNOT_UPDATE_COURSE_STEP_WITHOUT_ORDER
                )
