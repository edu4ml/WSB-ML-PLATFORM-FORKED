from dataclasses import dataclass

from elearning.reporting.entities.course import Course


@dataclass
class Teacher:
    courses: set[Course]
