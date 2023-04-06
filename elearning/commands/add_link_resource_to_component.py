from dataclasses import dataclass
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class AddLinkResourceToComponent(Command):
    title: str
    url: str
    component_uuid: str

    class Meta:
        name = CommandTypes.ADD_LINK_RESOURCE_TO_COMPONENT
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return cls(
            component_uuid=request.data.get("component_uuid"),
            issuer=request.user,
            title=request.data.get("title"),
            url=request.data.get("url"),
        )


class OnAddLinkResourceToComponent(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: Command):
        return self.repository.component.add_link_resource(
            component_uuid=command.component_uuid,
            url=command.url,
            title=command.title,
        )
