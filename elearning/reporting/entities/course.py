

from dataclasses import dataclass
from typing import List
from uuid import UUID

from elearning.reporting.entities.student import StudentInCourse


@dataclass
class Course:
    uuid: UUID

    students: List[StudentInCourse]
