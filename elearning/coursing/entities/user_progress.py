from dataclasses import dataclass, field
from datetime import datetime
from typing import List
from uuid import UUID

from elearning.coursing.entities.evaluation_attempt import EvaluationAttempt


@dataclass
class CourseStepUserProgress:
    tracking_uuid: UUID
    is_completed: bool
    completed_at: datetime
    submissions: List[EvaluationAttempt]

    #
    is_blocked: bool = field(init=False)
