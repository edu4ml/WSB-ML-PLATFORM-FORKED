from dataclasses import dataclass, field
from uuid import UUID

from elearning.coursing.entities.external_resource import ExternalResource


@dataclass
class CourseComponent:
    uuid: UUID | None
    title: str
    description: str
    type: str
    resources: list[ExternalResource] = field(default_factory=lambda: list())
