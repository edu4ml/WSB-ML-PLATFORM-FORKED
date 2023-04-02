from dataclasses import dataclass
from datetime import datetime
from typing import List
from uuid import UUID

from elearning.coursing.entities.evaluation_attempt import EvaluationAttempt


@dataclass
class CourseStepUserProgress:
    tracking_uuid: UUID
    submissions: List[EvaluationAttempt]
    completed_at: datetime | None = None
    is_completed: bool = False
    is_blocked: bool | None = None
