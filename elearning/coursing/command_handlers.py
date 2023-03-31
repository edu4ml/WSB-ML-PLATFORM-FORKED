from db.repository.configuration import RepositoryRoot
from elearning.coursing.commands import (
    CompleteCourseStep,
    CreateCourse,
)
from elearning.coursing.course import Course
from infra.command_handler import CommandHandler
from infra.event import Event


class OnCreateCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CreateCourse):
        entity = Course(
            title=command.title,
            description=command.description,
            is_draft=True,
            uuid=None,
            created_at=None,
            updated_at=None,
        )
        return self.repository.course.persist(entity)


class OnCompleteCourseStep(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CompleteCourseStep):
        self.repository.course_step_user_progress.update_by_uuid(
            uuid=command.progress_tracking_uuid, is_completed=True
        )
