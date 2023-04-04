from dataclasses import dataclass
from uuid import UUID


@dataclass
class Author:
    uuid: UUID
    first_name: str
    last_name: str
    email: str
