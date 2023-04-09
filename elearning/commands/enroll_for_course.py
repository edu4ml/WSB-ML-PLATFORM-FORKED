from dataclasses import dataclass
from elearning.entities.user import User

from infra.command import Command
from shared.enums import CommandTypes, UserRoles
from db.repository.configuration import RepositoryRoot
from infra.command_handler import CommandHandler
from infra.event import Event
from infra.exceptions import CommandBusException


@dataclass(kw_only=True)
class EnrollForCourse(Command):
    user_uuid: int

    class Meta:
        name = CommandTypes.ENROLL_FOR_COURSE
        roles = [UserRoles.TEACHER, UserRoles.STUDENT, UserRoles.ADMIN]

    @classmethod
    def build_from_request(cls, request, **kwargs):
        return EnrollForCourse(
            issuer=request.user,
            parent_uuid=request.data["course_uuid"],
            user_uuid=request.data["user_uuid"],
        )


class OnEnrollForCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: EnrollForCourse):
        enrollment = self.repository.enrollment.search_single(
            user__uuid=command.user_uuid, course__uuid=command.parent_uuid
        )
        course = self.repository.course.get_by_uuid(command.parent_uuid)
        user: User = self.repository.user.get_by_uuid(command.user_uuid)

        self._check_user_exists(user)
        self._check_parent_exists(course)
        self._check_is_already_enrolled(enrollment)
        self._check_course_is_not_draft(course)

        enrollment = self.repository.enrollment.create(
            course_id=course.uuid, user_id=user.uuid
        )

        self.repository.course_step_user_progress.create_user_progress_for_course(
            course=course, user=user
        )

        return enrollment

    def _check_user_exists(self, user):
        if user is None:
            raise CommandBusException("User not found", 400)

    def _check_is_already_enrolled(self, enrollment):
        if enrollment is not None:
            raise CommandBusException("User is already enrolled in course", 400)

    def _check_course_is_not_draft(self, course):
        if course.is_draft:
            raise CommandBusException("Cannot enroll in unpublished course", 400)

    def _check_parent_exists(self, course):
        if course is None:
            raise CommandBusException("Course not found", 404)
