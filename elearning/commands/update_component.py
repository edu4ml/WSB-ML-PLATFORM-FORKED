from dataclasses import dataclass
from uuid import UUID
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class UpdateComponent(Command):
    component_uuid: UUID
    description: str

    class Meta:
        name = CommandTypes.COMPONENT_UPDATE
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return cls(
            issuer=request.user,
            component_uuid=request.data["component_uuid"],
            description=request.data["description"],
        )


class OnUpdateComponent(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: Command):
        return self.repository.component.update_by_uuid(
            uuid=command.component_uuid, description=command.description
        )
