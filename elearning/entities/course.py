from dataclasses import dataclass, field
from datetime import datetime
from typing import List
from uuid import UUID

from elearning.entities import CourseStep
from elearning.entities.author import Author


@dataclass
class Course:
    uuid: UUID
    updated_at: datetime
    created_at: datetime

    title: str
    description: str
    is_draft: bool
    author: Author

    is_enrolled: bool
    steps: List[CourseStep] = field(default_factory=lambda: list())
    progress: int = field(init=False, default=0)

    def __post_init__(self):
        self.progress = self._calculate_progress()

    def _calculate_progress(self) -> int:
        steps_total = len(self.steps)
        steps_completed = len(
            list(filter(lambda step: step.user_progress.is_completed, self.steps))
        )
        if steps_total == 0:
            return 0
        else:
            return int((steps_completed / steps_total) * 100)
