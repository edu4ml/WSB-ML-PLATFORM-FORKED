from dataclasses import dataclass
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class RejectSubmission(Command):
    class Meta:
        name = CommandTypes.REJECT_SUBMISSION
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return cls(
            issuer=request.user,
            parent_uuid=kwargs["submission_uuid"],
        )


class OnSubmissionReject(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: Command):
        rejected_submission = self.repository.submission.reject(command.parent_uuid)

        return self.repository.submission.from_model(rejected_submission)
