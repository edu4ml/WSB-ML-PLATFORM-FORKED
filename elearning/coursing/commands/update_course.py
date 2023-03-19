from dataclasses import dataclass
from typing import List
from uuid import UUID

from infra.command import Command
from shared.enums import CommandTypes, CourseStepContentTypes


@dataclass
class UpdateCourseStepType:
    order: int
    id: UUID
    content_type: CourseStepContentTypes


@dataclass
class UpdateCourse(Command):
    title: str | None = None
    description: str | None = None
    is_draft: bool | None = None

    steps: List[UpdateCourseStepType] | None = None

    class Meta:
        name = CommandTypes.UPDATE_COURSE
