from dataclasses import dataclass
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
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
            issuer=request.user,
            parent_uuid=kwargs["course_uuid"],
            progress_tracking_uuid=request.data.get("progress_tracking_uuid"),
        )


class OnCompleteCourseStep(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CompleteCourseStep):
        self.repository.course_step_user_progress.update_by_uuid(
            uuid=command.progress_tracking_uuid, is_completed=True
        )
