from dataclasses import dataclass
from uuid import UUID


@dataclass
class EvaluationAttempt:
    uuid: UUID
    title: str
    description: str
    file_link: str
    status: str
