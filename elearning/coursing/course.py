from dataclasses import dataclass, field
from typing import List
from elearning.coursing.entities import CourseStep


@dataclass
class Course:
    """
    Main Aggregate in coursing domain
    """

    id: int | None
    title: str
    description: str
    is_draft: bool

    is_enrolled: bool = False
    current_active: int = None

    progress: int = 0

    steps: List[CourseStep] = field(default_factory=lambda: list())

    def __post_init__(self):
        self._calculate_blocked_steps()
        self._calculate_progress()

    def _calculate_progress(self) -> int:
        steps_total = len(self.steps)
        steps_completed = len(
            list(filter(lambda step: step.user_progress.is_completed, self.steps))
        )
        if steps_total == 0:
            self.progress = 0
        else:
            self.progress = int((steps_completed / steps_total) * 100)

    def _calculate_blocked_steps(self):
        previous_step = None

        for step in self.steps:
            if step.order == 1:
                step.user_progress.is_blocked = False
                self.current_active = step.order
            elif previous_step.user_progress.is_completed:
                step.user_progress.is_blocked = False
                self.current_active = step.order
            else:
                step.user_progress.is_blocked = True
            previous_step = step
