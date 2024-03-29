from dataclasses import dataclass
from uuid import UUID
from db.repository.configuration import RepositoryRoot

from infra.command import Command
from infra.command_handler import CommandHandler
from infra.event import Event
from infra.exceptions import CommandBusException
from shared.enums import CommandTypes, UserRoles


@dataclass(kw_only=True)
class PublishCourse(Command):
    course_uuid: UUID

    class Meta:
        name = CommandTypes.PUBLISH_COURSE
        roles = [UserRoles.TEACHER, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return cls(
            issuer=request.user,
            course_uuid=request.data["course_uuid"],
        )


class OnPublishCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: Command):
        self._check_if_user_is_author(command)
        return self.repository.course.publish(command.course_uuid)

    def _check_if_user_is_author(self, command):
        if (
            command.issuer.uuid
            != self.repository.course.get_by_uuid(command.course_uuid).author
        ):
            raise CommandBusException("Only author can publish the course", 403)
