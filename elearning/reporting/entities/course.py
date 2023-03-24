from dataclasses import dataclass
from typing import List
from uuid import UUID

from elearning.reporting.entities.student import StudentWithProgress


@dataclass
class Course:
    uuid: UUID
    title: str
    students: List[StudentWithProgress]
