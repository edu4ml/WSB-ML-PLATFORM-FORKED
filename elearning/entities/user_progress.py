from dataclasses import dataclass
from datetime import datetime
from typing import List
from uuid import UUID

from elearning.entities.submission import Submission


@dataclass
class CourseStepUserProgress:
    tracking_uuid: UUID
    is_completed: bool
    is_blocked: bool
    completed_at: datetime
    submissions: List[Submission]
