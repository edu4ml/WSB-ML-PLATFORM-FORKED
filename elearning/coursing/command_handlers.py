from db.repository.configuration import RepositoryRoot
from elearning.coursing.commands import (
    CreateCourse,
    EnrollForCourse,
    CompleteCourseStep,
    UpdateCourse,
)
from infra.event import Event
from infra.command_handler import CommandHandler
from elearning.coursing.course import Course
from elearning.coursing.entities import CourseStep


class OnCreateCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CreateCourse):
        entity = Course(
            title=command.title, description=command.description, is_draft=True, id=None
        )
        return self.repository.course.persist(entity)


class OnEnrollForCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: EnrollForCourse):
        self.repository.course.create_enrollment(command.parent_id, command.user_id)


class OnCompleteCourseStep(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: CompleteCourseStep):
        self.repository.course.complete_step_for_user(command.progress_tracking_id)


class OnUpdateCourse(CommandHandler):
    emitting_event: Event | None = None
    repository: RepositoryRoot = None

    def _handle_command(self, command: UpdateCourse):
        with self.repository.course.with_entity(parent_id=command.parent_id) as course:
            course.title = command.title
            course.description = command.description
            course.is_draft = command.is_draft

            if command.steps is not None:
                course.steps = [
                    CourseStep(
                        order=s["order"], content_type=s["content_type"], id=s["id"]
                    )
                    for s in command.steps
                ]
            else:
                course.steps = None
