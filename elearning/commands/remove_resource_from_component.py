from dataclasses import dataclass
from uuid import UUID
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class RemoveResourceFromComponent(Command):
    component_uuid: UUID
    resource_uuid: UUID

    class Meta:
        name = CommandTypes.REMOVE_RESOURCE_FROM_COMPONENT
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return cls(
            issuer=request.user,
            component_uuid=request.data.get("component_uuid"),
            resource_uuid=request.data.get("resource_uuid"),
        )


class OnRemoveAttachmentFromComponent(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: Command):
        return self.repository.component.remove_resource(
            component_uuid=command.component_uuid,
            resource_uuid=command.resource_uuid,
        )
