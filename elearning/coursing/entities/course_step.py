from dataclasses import dataclass, field

from elearning.coursing.entities import CourseComponentCompletion
from shared.enums import CourseStepEvaluationTypes


@dataclass
class CourseStepComponent:
    title: str
    description: str
    type: str
    resources: list[dict] = field(default_factory=lambda: list())


@dataclass
class CourseStep:
    order: int
    component: CourseStepComponent
    evaluation_type: CourseStepEvaluationTypes
    user_progress: CourseComponentCompletion | None = None
