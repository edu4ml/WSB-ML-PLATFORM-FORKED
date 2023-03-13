from dataclasses import dataclass
from datetime import datetime


@dataclass(kw_only=True)
class Command:
    """
    Baseclass for commands to interact with domain
    """

    parent_id: int
    created_at: datetime = datetime.now()
