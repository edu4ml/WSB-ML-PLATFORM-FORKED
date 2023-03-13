from dataclasses import dataclass
from datetime import datetime


@dataclass
class CourseComponentCompletion:
    tracking_id: int
    completed_at: datetime | None = None
    is_completed: bool = False
    is_blocked: bool = False
