from db.models import (
    CourseEnrollment as CourseEnrollmentDbModel,
)
from elearning.entities import (
    CourseEnrollment as CourseEnrollmentDomainModel,
)
from infra.logging import logger
from infra.repository import ModelRepository


@logger
class CourseEnrollmentRepo(ModelRepository[CourseEnrollmentDbModel]):
    db_model = CourseEnrollmentDbModel
    domain_model = CourseEnrollmentDomainModel

    def from_model(self, obj):
        return self.domain_model(
            user=obj.user.uuid,
            course=obj.course.uuid,
            is_completed=obj.is_completed,
        )
