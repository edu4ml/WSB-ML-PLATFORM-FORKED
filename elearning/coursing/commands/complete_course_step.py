from dataclasses import dataclass

from infra.command import Command
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class CompleteCourseStep(Command):
    progress_tracking_uuid: int

    class Meta:
        name = CommandTypes.COMPLETE_COURSE_STEP
        roles = [UserRoles.TEACHER, UserRoles.STUDENT, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return CompleteCourseStep(
            parent_uuid=kwargs["course_uuid"],
            progress_tracking_uuid=request.data.get("progress_tracking_uuid"),
        )
