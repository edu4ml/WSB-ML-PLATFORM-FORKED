from dataclasses import dataclass, field

from elearning.coursing.entities import CourseComponentCompletion
from shared.enums import CourseStepContentTypes


@dataclass
class CourseStep:
    order: int

    id: int
    content_type: CourseStepContentTypes

    # Read only values
    title: str | None = None
    description: str | None = None

    user_progress: CourseComponentCompletion | None = None

    is_self_evaluated: bool | None = None
    requires_manual_review: bool | None = None

    resources: list[dict] = field(default_factory=lambda: list())
