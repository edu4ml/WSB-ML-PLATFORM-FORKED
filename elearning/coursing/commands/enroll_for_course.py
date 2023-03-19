from dataclasses import dataclass

from infra.command import Command
from shared.enums import CommandTypes


@dataclass(kw_only=True)
class EnrollForCourse(Command):
    user_id: int

    class Meta:
        name = CommandTypes.ENROLL_FOR_COURSE
