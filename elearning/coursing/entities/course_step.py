from dataclasses import dataclass, field
from uuid import UUID

from elearning.coursing.entities import CourseComponentCompletion
from shared.enums import CourseStepContentTypes, CourseStepEvaluationTypes


@dataclass
class CourseStep:
    order: int

    uuid: UUID
    content_type: CourseStepContentTypes
    evaluation_type: CourseStepEvaluationTypes

    # Read only values
    title: str | None = None
    description: str | None = None

    user_progress: CourseComponentCompletion | None = None

    is_self_evaluated: bool | None = None
    requires_manual_review: bool | None = None

    resources: list[dict] = field(default_factory=lambda: list())
