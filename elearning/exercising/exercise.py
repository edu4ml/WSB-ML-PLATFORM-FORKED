from dataclasses import dataclass, field
from typing import List
from uuid import UUID
from .entities import LinkResource
from shared.enums import CourseStepContentTypes


@dataclass
class Exercise:
    """
    Main Aggregate in esercising domin
    """

    id: UUID
    title: str
    description: str
    resources: List[LinkResource] = field(default_factory=lambda: list())

    content_type: str = CourseStepContentTypes.EXERCISE
