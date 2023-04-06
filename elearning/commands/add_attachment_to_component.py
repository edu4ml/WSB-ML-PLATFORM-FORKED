from dataclasses import dataclass
from django.utils.datastructures import MultiValueDict
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class AddAttachmentToComponent(Command):
    title: str
    file: MultiValueDict
    component_uuid: str

    class Meta:
        name = CommandTypes.ADD_ATTACHMENT_TO_COMPONENT
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return cls(
            component_uuid=request.data.get("component_uuid"),
            issuer=request.user,
            file=request.FILES,
            title=request.FILES["file"].name.replace(" ", "_"),
        )


class OnAddAttachmentToComponent(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: Command):
        return self.repository.component.add_resource(
            component_uuid=command.component_uuid,
            file=command.file,
            title=command.title,
        )
