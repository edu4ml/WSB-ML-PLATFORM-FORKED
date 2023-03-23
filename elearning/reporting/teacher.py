from dataclasses import dataclass
from uuid import UUID

from elearning.reporting.entities.course import Course


@dataclass
class Teacher:
    courses: set[Course]
