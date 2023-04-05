from dataclasses import dataclass, field
from uuid import UUID
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class CreateCourseComponent(Command):
    parent_uuid: UUID = field(init=False)
    title: str
    description: str

    class Meta:
        name = CommandTypes.CREATE_COURSE_COMPONENT
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]
        is_initial = True

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return cls(
            issuer=request.user,
            title=request.data.get("title"),
            description=request.data.get("description", ""),
        )


class OnCreateCourseComponent(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: Command):
        return self.repository.course_component.create(
            title=command.title,
            description=command.description,
        )
