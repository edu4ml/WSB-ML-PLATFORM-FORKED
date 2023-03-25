from dataclasses import dataclass
from typing import List
from uuid import UUID
from shared.enums import CourseStepComponentTypes


@dataclass
class CourseComponent:
    uuid: UUID
    title: str
    description: str
    type: CourseStepComponentTypes
    resources: List[dict]
