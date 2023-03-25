from dataclasses import dataclass
from typing import List
from uuid import UUID

from infra.command import Command
from shared.enums import CommandTypes, UserRoles, CourseStepComponentTypes


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
