from dataclasses import dataclass

from infra.command import Command
from infra.exceptions import CommandBusException
from shared.enums import ApiErrors, CommandTypes, UserRoles
from db.repository.configuration import RepositoryRoot
from infra.command_handler import CommandHandler
from infra.event import Event


@dataclass(kw_only=True)
class CreateCourse(Command):
    title: str
    description: str

    class Meta:
        name = CommandTypes.CREATE_COURSE
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]
        is_initial = True

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return CreateCourse(
            issuer=request.user,
            title=request.data.get("title"),
            description=request.data.get("description", ""),
        )


class OnCreateCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CreateCourse):
        self._check_if_title_was_provided(command)
        return self.repository.course.create(
            **dict(
                title=command.title,
                is_draft=True,
                author_id=command.issuer.uuid,
            )
        )

    def _check_if_title_was_provided(self, command):
        if command.title is None or command.title == "":
            raise CommandBusException(ApiErrors.CANNOT_CREATE_COURSE_WITHOUT_TITLE, 400)
