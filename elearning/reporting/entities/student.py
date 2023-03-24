from dataclasses import dataclass
from datetime import datetime
from typing import List
from uuid import UUID

from shared.enums import CourseStepEvaluationStatus


@dataclass
class StudentInCourseStepEvaluationAttempt:
    title: str
    description: str
    status: CourseStepEvaluationStatus


@dataclass
class StudentInCourseStepProgress:
    title: str
    order: int
    completed_at: datetime
    is_completed: bool

    evaluation_status: List[StudentInCourseStepEvaluationAttempt]


@dataclass
class StudentInCourseProgress:
    has_completed_course: bool
    steps: set[StudentInCourseStepProgress]
    current_step: int = 0

    def __post_init__(self):
        self._calculate_current_step()

    def _calculate_current_step(self):
        self.current_step = len(list(filter(lambda c: c.is_completed, self.steps)))


@dataclass
class Student:
    uuid: UUID
    email: str


@dataclass
class StudentWithProgress(Student):
    progress: StudentInCourseProgress
