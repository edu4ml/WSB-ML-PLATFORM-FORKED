from dataclasses import dataclass, field
from uuid import UUID


@dataclass
class CourseComponent:
    uuid: UUID | None
    title: str
    description: str
    type: str
    resources: list[dict] = field(default_factory=lambda: list())
