from dataclasses import dataclass
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class ApproveSubmission(Command):
    class Meta:
        name = CommandTypes.APPROVE_SUBMISSION
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return cls(
            issuer=request.user,
            parent_uuid=request.data["submission_uuid"],
        )


class OnSubmissionApprove(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: Command):
        approved_submission = self.repository.submission.approve(command.parent_uuid)
        step_completed = (
            self.repository.course_step_user_progress.complete_step_for_user(
                step_uuid=approved_submission.course_step.uuid,
                user_uuid=approved_submission.user.uuid,
            )
        )

        if not step_completed.step.is_last_step:
            self.repository.course_step_user_progress.unlock_step_for_user(
                step_uuid=step_completed.step.next_step.uuid,
                user_uuid=approved_submission.user.uuid,
            )

        return self.repository.submission.from_model(approved_submission)
