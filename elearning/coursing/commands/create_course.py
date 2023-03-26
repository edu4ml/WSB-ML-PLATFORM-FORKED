from dataclasses import dataclass

from infra.command import Command
from infra.exceptions import CommandProcessingException
from shared.enums import ApiErrors, CommandTypes, UserRoles
from db.repository.configuration import RepositoryRoot
from elearning.coursing.course import Course
from infra.command_handler import CommandHandler
from infra.event import Event


@dataclass(kw_only=True)
class CreateCourse(Command):
    parent_uuid: int = None  # indicates initial command (no parent yet!)

    title: str
    description: str

    class Meta:
        name = CommandTypes.CREATE_COURSE
        is_initial = True

        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        command = CreateCourse(
            title=request.data.get("title"),
            description=request.data.get("description", ""),
        )
        command.issuer = request.user
        return command


class OnCreateCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CreateCourse):
        self._check_if_title_was_provided(command)
        # refactor me to use self.repository.course.crud.create()
        entity = Course(
            title=command.title,
            description=command.description,
            is_draft=True,
            uuid=None,
            created_at=None,
            updated_at=None,
            author=command.issuer.uuid,
        )
        return self.repository.course.persist(entity)

    def _check_if_title_was_provided(self, command):
        if command.title is None or command.title == "":
            raise CommandProcessingException(
                ApiErrors.CANNOT_CREATE_COURSE_WITHOUT_TITLE
            )
