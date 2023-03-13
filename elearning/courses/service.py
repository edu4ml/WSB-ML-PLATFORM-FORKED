from db.repository.configuration import RepositoryRoot
from elearning.courses.commands import CreateCourse, EnrollForCourse, CompleteCourseStep
from infra.event import Event
from infra.service import Service
from elearning.courses.course import Course
from django.utils import timezone


class OnCreateCourse(Service):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CreateCourse):
        entity = Course(
            title=command.title, description=command.description, is_draft=True, id=None
        )
        self.repository.course.persist(entity)


class OnEnrollForCourse(Service):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: EnrollForCourse):
        self.repository.course.create_enrollment(command.parent_id, command.user_id)


class OnCompleteCourseStep(Service):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CompleteCourseStep):
        with self.repository.course_component_completion.with_obj(
            command.progress_tracking_id
        ) as user_course_component_progress:
            user_course_component_progress.is_completed = True
            user_course_component_progress.completed_at = timezone.now()
