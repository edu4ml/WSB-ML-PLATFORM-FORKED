from dataclasses import dataclass, field
from uuid import UUID
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from shared.enums import CommandTypes, UserRoles
from django.utils.datastructures import MultiValueDict


@dataclass(kw_only=True)
class SubmitSubmission(Command):
    parent_uuid: int = field(init=False, default=None)

    title: str
    description: str
    course_step_uuid: UUID
    file: MultiValueDict

    class Meta:
        name = CommandTypes.SUBMIT_SUBMISSION
        roles = [UserRoles.TEACHER, UserRoles.ADMIN, UserRoles.STUDENT]
        is_initial = True

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return cls(
            issuer=request.user,
            title=request.POST.get("title"),
            description=request.POST.get("description"),
            course_step_uuid=UUID(request.POST.get("course_step")),
            file=request.FILES,
        )


class OnSubmitSubmission(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: Command):
        return self.repository.submission.create(
            file=command.file,
            user=command.issuer,
            title=command.title,
            description=command.description,
            course_step_uuid=command.course_step_uuid,
        )
