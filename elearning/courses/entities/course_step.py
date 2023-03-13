from dataclasses import dataclass, field
from elearning.courses.entities import CourseComponentCompletion


@dataclass
class CourseStep:
    order: int
    title: str
    description: str

    user_progress: CourseComponentCompletion | None = None

    is_self_evaluated: bool = False
    requires_manual_review: bool = True

    resources: list[dict] = field(default_factory=lambda: list())
