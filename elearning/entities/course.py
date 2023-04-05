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
        self._calculate_blocked_steps()
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

    def _calculate_blocked_steps(self):
        """
        This calculation needs to be done from whole course perspective
        so having it in CourseStep or lower entity is not a good idea
        cause we need to know about all steps in course
        """
        previous_step = None
        for step in self.steps:
            if step.order == 1:
                step.user_progress.is_blocked = False
            elif previous_step.user_progress.is_completed:
                step.user_progress.is_blocked = False
            else:
                step.user_progress.is_blocked = True
            previous_step = step
