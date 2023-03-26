from dataclasses import dataclass
from uuid import UUID


@dataclass
class Enrollment:
    user: UUID
    course: UUID
    is_completed: bool = False
