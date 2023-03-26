from db.models import (
    CourseEnrollment as CourseEnrollmentDbModel,
)
from elearning.coursing.entities.enrollment import Enrollment
from infra.logging import logger
from infra.repository import Repository, RepositoryCrud, RepositoryEntityBuilder


class CourseEnrollmentEntityBuilder(RepositoryEntityBuilder):
    root_entity = Enrollment

    def from_model(self, obj):
        return self.root_entity(
            user=obj.user.uuid,
            course=obj.course.uuid,
            is_completed=obj.is_completed,
        )


@logger
class CourseEnrollmentRepositoryCRUD(RepositoryCrud):
    root_model = CourseEnrollmentDbModel
    entity_builder = CourseEnrollmentEntityBuilder()


@logger
class CourseEnrollmentRepository(Repository):
    root_model = CourseEnrollmentDbModel
    crud = CourseEnrollmentRepositoryCRUD()
    entity_builder = CourseEnrollmentEntityBuilder()
