from dataclasses import dataclass, field
from datetime import datetime
from uuid import UUID

from elearning.entities.external_resource import ExternalResource


@dataclass
class CourseComponent:
    uuid: UUID | None
    created_at: datetime | None
    title: str
    description: str
    type: str
    resources: list[ExternalResource] = field(default_factory=lambda: list())
