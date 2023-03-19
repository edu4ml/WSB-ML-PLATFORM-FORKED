from dataclasses import dataclass
from datetime import datetime
from uuid import UUID


@dataclass
class CourseComponentCompletion:
    tracking_uuid: UUID
    completed_at: datetime | None = None
    is_completed: bool = False
    is_blocked: bool = False
