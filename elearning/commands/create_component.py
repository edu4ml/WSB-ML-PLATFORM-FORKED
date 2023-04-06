from dataclasses import dataclass
from uuid import UUID
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from infra.exceptions import CommandBusException
from shared.enums import ApiErrors, CommandTypes, UserRoles


@dataclass(kw_only=True)
class CreateComponent(Command):
    title: str
    description: str
    author: UUID
    parent_uuid: UUID | None = None

    class Meta:
        name = CommandTypes.CREATE_COMPONENT
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]
        is_initial = True

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return cls(
            issuer=request.user,
            author=request.user.uuid,
            title=request.data.get("title"),
            description=request.data.get("description"),
        )


class OnCreateComponent(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: Command):
        self._check_required_data_filled(command)
        return self.repository.component.create(
            title=command.title,
            description=command.description,
            author_id=command.author,
        )

    def _check_required_data_filled(self, command):
        if any(
            [
                command.title is None,
                command.title == "",
                command.description is None,
                command.description == "",
            ]
        ):
            raise CommandBusException(ApiErrors.COMPONENT_MISSING_DATA, 400)
