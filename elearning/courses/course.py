from dataclasses import dataclass, field
from typing import List
from elearning.courses.entities import CourseStep


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

    steps: List[CourseStep] = field(default_factory=lambda: list())

    def __post_init__(self):
        self._calculate_blocked_steps()

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
