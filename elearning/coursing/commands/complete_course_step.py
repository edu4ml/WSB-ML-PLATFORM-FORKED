from dataclasses import dataclass
from shared.enums import CommandTypes
from infra.command import Command


@dataclass(kw_only=True)
class CompleteCourseStep(Command):
    progress_tracking_id: int

    class Meta:
        name = CommandTypes.COMPLETE_COURSE_STEP
