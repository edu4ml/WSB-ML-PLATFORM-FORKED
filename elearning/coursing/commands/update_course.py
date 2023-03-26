from dataclasses import dataclass
from typing import List
from uuid import UUID

from infra.command import Command
from shared.enums import CommandTypes, UserRoles, CourseStepComponentTypes
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
        return UpdateCourse(
            parent_uuid=kwargs["course_uuid"],
            title=request.data.get("title"),
            description=request.data.get("description"),
            is_draft=request.data.get("is_draft"),
            steps=request.data.get("steps"),
        )


class OnUpdateCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: UpdateCourse):
        with self.repository.course.with_entity(
            parent_uuid=command.parent_uuid
        ) as course:
            course.title = command.title
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
