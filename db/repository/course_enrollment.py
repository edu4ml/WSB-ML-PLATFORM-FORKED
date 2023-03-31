from db.models import (
    CourseEnrollment as CourseEnrollmentDbModel,
)
from elearning.coursing.entities import (
    CourseEnrollment as CourseEnrollmentDomainModel,
)
from infra.logging import logger
from infra.repository import ModelRepository


@logger
class CourseEnrollmentRepo(ModelRepository[CourseEnrollmentDbModel]):
    root_model = CourseEnrollmentDbModel
    root_entity = CourseEnrollmentDomainModel

    def from_model(self, obj):
        return self.root_entity(
            user=obj.user.uuid,
            course=obj.course.uuid,
            is_completed=obj.is_completed,
        )
