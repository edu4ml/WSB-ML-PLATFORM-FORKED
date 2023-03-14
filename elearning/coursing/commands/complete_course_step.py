from dataclasses import dataclass

from infra.command import Command


@dataclass(kw_only=True)
class CompleteCourseStep(Command):
    progress_tracking_id: int

    class Meta:
        name = "COMPLETE_COURSE_STEP"
