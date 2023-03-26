from dataclasses import dataclass

from infra.command import Command
from shared.enums import CommandTypes, UserRoles
from db.repository.configuration import RepositoryRoot
from infra.command_handler import CommandHandler
from infra.event import Event
from infra.exceptions import CommandProcessingException
from shared.enums import CommandApiErrors


@dataclass(kw_only=True)
class EnrollForCourse(Command):
    user_uuid: int

    class Meta:
        name = CommandTypes.ENROLL_FOR_COURSE
        roles = [UserRoles.TEACHER, UserRoles.STUDENT, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return EnrollForCourse(
            parent_uuid=kwargs["course_uuid"], user_uuid=request.data.get("user_uuid")
        )


class OnEnrollForCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: EnrollForCourse):
        enrollment = self.repository.crud.enrollment.search(
            user__uuid=command.user_uuid, course__uuid=command.parent_uuid
        )
        course = self.repository.course.retrieve(command.parent_uuid)
        self._check_parent_exists(course)
        self._check_is_already_enrolled(enrollment)
        self._check_course_is_not_draft(course)

        self.repository.course.create_enrollment(command.parent_uuid, command.user_uuid)

    def _check_is_already_enrolled(self, enrollment):
        if enrollment is not None:
            raise CommandProcessingException(
                CommandApiErrors.CANNOT_ENROLL_FOR_COURSE_ALREADY_ENROLLED
            )

    def _check_course_is_not_draft(self, course):
        if course.is_draft:
            raise CommandProcessingException(
                CommandApiErrors.CANNOT_ENROLL_FOR_COURSE_IN_DRAFT
            )

    def _check_parent_exists(self, course):
        if course is None:
            raise CommandProcessingException(
                CommandApiErrors.COMMAND_TYPE_HAS_NO_PARENT
            )
