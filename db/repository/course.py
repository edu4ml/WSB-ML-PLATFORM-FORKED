from typing import List
from infra.logging import logger
from infra.repository import Repository
from db.models import (
    Course as CourseDbModel,
    CourseEnrollment as CourseEnrollmentDbModel,
)
from elearning.courses.course import Course
from django.contrib.auth import get_user_model

User = get_user_model()


@logger
class CourseRepository(Repository):
    """
    Abstraction layer to retrieve the domain entity of course object
    """

    root_model = CourseDbModel

    def persist(self, aggregate: Course):
        CourseDbModel.objects.create(
            title=aggregate.title,
            description=aggregate.description,
            is_draft=aggregate.is_draft,
        )

    def list(self) -> List[Course]:
        course_modles = CourseDbModel.objects.all()
        return [self._prepare_domain_entity(c) for c in course_modles]

    def retrieve(self, id):
        try:
            return self._prepare_domain_entity(CourseDbModel.objects.get(id=id))
        except CourseDbModel.DoesNotExist as e:
            self.logger.error(e)
        return None

    def create_enrollment(self, course_id, user_id):
        CourseEnrollmentDbModel.objects.create(
            course=CourseDbModel.objects.get(id=course_id),
            user=User.objects.get(id=user_id),
        )

    def _prepare_domain_entity(self, course) -> Course:
        return Course(
            title=course.title,
            description=course.description,
            is_draft=course.is_draft,
            is_enrolled=self._is_enrolled(course),
        )

    def _is_enrolled(self, course):
        if not self.user:
            return False
        return CourseEnrollmentDbModel.objects.filter(
            user=self.user, course=course
        ).exists()
