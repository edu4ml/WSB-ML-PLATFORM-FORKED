
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
    
@dataclass
class StudentInCourse:
    uuid: UUID
    email: str

    progress: StudentInCourseProgress
    