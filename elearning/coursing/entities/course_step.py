from dataclasses import dataclass
from elearning.coursing.entities import CourseComponentCompletion
from elearning.coursing.entities.course_component import CourseComponent
from shared.enums import CourseStepEvaluationType


@dataclass
class CourseStep:
    order: int
    component: CourseComponent
    evaluation_type: CourseStepEvaluationType
    user_progress: CourseComponentCompletion | None = None
