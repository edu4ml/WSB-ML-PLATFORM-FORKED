from dataclasses import dataclass
from uuid import UUID


@dataclass
class ExternalResource:
    uuid: UUID
    title: str
    url: str
    file_link: str
