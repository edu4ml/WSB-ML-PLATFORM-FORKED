from dataclasses import dataclass
from uuid import UUID
from elearning.entities import CourseStepUserProgress
from elearning.entities.component import Component
from shared.enums import CourseComponentType, CourseStepEvaluationType


@dataclass
class CourseStep:
    uuid: UUID
    order: int
    component: Component
    evaluation_type: CourseStepEvaluationType
    user_progress: CourseStepUserProgress


@dataclass
class NewCourseStep:
    component: UUID
    order: int
    evaluation_type: CourseComponentType
