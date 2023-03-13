from dataclasses import dataclass

from infra.command import Command


@dataclass(kw_only=True)
class EnrollForCourse(Command):
    user_id: int

    class Meta:
        name = "ENROLL_FOR_COURSE"
