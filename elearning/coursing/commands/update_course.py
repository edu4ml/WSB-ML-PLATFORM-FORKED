from dataclasses import dataclass
from typing import List
from infra.command import Command
from shared.enums import CommandTypes, CourseStepContentTypes


@dataclass
class UpdateCourseStepType:
    order: int
    id: int
    content_type: CourseStepContentTypes


@dataclass
class UpdateCourse(Command):
    title: str
    description: str

    steps: List[UpdateCourseStepType]

    class Meta:
        name = CommandTypes.UPDATE_COURSE
