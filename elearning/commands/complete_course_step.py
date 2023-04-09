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
            course_uuid=request.data["courseUUID"],
            step_uuid=request.data["stepUUID"],
            user_uuid=request.data["userUUID"],
            parent_uuid=None,
        )


class OnCompleteCourseStep(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CompleteCourseStep):
        step_completed = (
            self.repository.course_step_user_progress.complete_step_for_user(
                step_uuid=command.step_uuid,
                user_uuid=command.user_uuid,
            )
        )
        if not step_completed.step.is_last_step:
            self.repository.course_step_user_progress.unlock_step_for_user(
                step_uuid=step_completed.step.next_step.uuid,
                user_uuid=command.user_uuid,
            )

        return self.repository.course_step_user_progress.from_model(step_completed)
