from dataclasses import dataclass
from datetime import datetime
from uuid import UUID

from shared.enums import CourseStepEvaluationStatus


@dataclass
class StudentInCourseStepProgress:
    title: str
    order: int
    completed_at: datetime
    is_completed: bool

    evaluation_status: CourseStepEvaluationStatus


@dataclass
class StudentInCourseProgress:
    has_completed_course: bool
    steps: set[StudentInCourseStepProgress]
    current_step: int = 0

    def __post_init__(self):
        self._calculate_current_step()

    def _calculate_current_step(self):
        self.current_step = len(
            list(filter(lambda c: c.is_completed == True, self.steps))
        )


@dataclass
class StudentInCourse:
    uuid: UUID
    email: str

    progress: StudentInCourseProgress
