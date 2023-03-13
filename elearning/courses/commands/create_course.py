from dataclasses import dataclass
from infra.command import Command


@dataclass(kw_only=True)
class CreateCourse(Command):
    title: str
    description: str
