from dataclasses import dataclass
from infra.command import Command
from shared.enums import CommandTypes


@dataclass
class UpdateCourse(Command):
    title: str
    description: str

    class Meta:
        name = CommandTypes.UPDATE_COURSE
