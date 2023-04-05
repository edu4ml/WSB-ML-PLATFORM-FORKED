from dataclasses import dataclass
from uuid import UUID
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class CompleteCourseStep(Command):
    course_uuid: UUID
    step_uuid: UUID
    user_uuid: UUID

    class Meta:
        name = CommandTypes.COMPLETE_COURSE_STEP
        roles = [UserRoles.TEACHER, UserRoles.STUDENT, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return CompleteCourseStep(
            issuer=request.user,
            course_uuid=kwargs["course_uuid"],
            step_uuid=kwargs["step_uuid"],
            user_uuid=kwargs["user_uuid"],
            parent_uuid=None,
        )


class OnCompleteCourseStep(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CompleteCourseStep):
        return self.repository.course_step_user_progress.complete_step_for_user(
            step_uuid=command.step_uuid,
            user_uuid=command.user_uuid,
        )
