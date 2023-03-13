from typing import List
from infra.logging import logger
from infra.repository import Repository
from db.models import Course as CourseDbModel
from elearning.courses.course import Course


@logger
class CourseRepository(Repository):
    """
    Abstraction layer to retrieve the domain entity of course object
    """

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

    def _prepare_domain_entity(self, db_model) -> Course:
        return Course(
            title=db_model.title,
            description=db_model.description,
            is_draft=db_model.is_draft,
            is_enrolled=self._is_enrolled(),
        )

    def _is_enrolled(self):
        if not self.user:
            return False
        return True
