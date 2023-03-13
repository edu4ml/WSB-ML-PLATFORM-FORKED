from elearning.courses.commands import CreateCourse, EnrollForCourse
from elearning.courses.events import CourseCreated
from infra.service import Service
from elearning.courses.course import Course


class OnCreateCourse(Service):
    emitting_event = CourseCreated

    def _handle_command(self, command: CreateCourse):
        entity = Course(
            title=command.title, description=command.description, is_draft=True
        )
        self.repository.persist(entity)


class OnEnrollForCourse(Service):
    emitting_event = None

    def _handle_command(self, command: EnrollForCourse):
        self.repository.create_enrollment(command.parent_id, command.user_id)
