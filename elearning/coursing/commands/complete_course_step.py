from dataclasses import dataclass

from infra.command import Command
from shared.enums import CommandTypes


@dataclass(kw_only=True)
class CompleteCourseStep(Command):
    progress_tracking_id: int

    class Meta:
        name = CommandTypes.COMPLETE_COURSE_STEP
