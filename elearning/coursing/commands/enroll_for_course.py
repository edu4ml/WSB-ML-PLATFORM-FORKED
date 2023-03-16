from dataclasses import dataclass
from shared.enums import CommandTypes
from infra.command import Command


@dataclass(kw_only=True)
class EnrollForCourse(Command):
    user_id: int

    class Meta:
        name = CommandTypes.ENROLL_FOR_COURSE
