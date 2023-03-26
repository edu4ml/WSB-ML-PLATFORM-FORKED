from db.models import (
    CourseEnrollment as CourseEnrollmentDbModel,
)
from elearning.coursing.entities.enrollment import Enrollment
from infra.logging import logger
from infra.repository import RepositoryCrud


@logger
class CourseEnrollmentRepositoryCRUD(RepositoryCrud):
    root_model = CourseEnrollmentDbModel
    root_entity = Enrollment

    def _from_object(self, obj):
        return self.root_entity(
            user=obj.user.uuid,
            course=obj.course.uuid,
            is_completed=obj.is_completed,
        )
