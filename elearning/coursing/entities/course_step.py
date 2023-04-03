from dataclasses import dataclass
from uuid import UUID
from elearning.coursing.entities import CourseStepUserProgress
from elearning.coursing.entities.course_component import CourseComponent
from shared.enums import CourseStepEvaluationType


@dataclass
class CourseStep:
    uuid: UUID
    order: int
    component: CourseComponent
    evaluation_type: CourseStepEvaluationType
    user_progress: CourseStepUserProgress
