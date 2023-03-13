from elearning.courses.commands import CreateCourse
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
