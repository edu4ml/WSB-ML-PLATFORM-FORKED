from dataclasses import dataclass
from uuid import UUID


@dataclass
class CourseEnrollment:
    user: UUID
    course: UUID
    is_completed: bool = False
