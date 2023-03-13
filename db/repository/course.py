from typing import List
from infra.logging import logger
from infra.repository import Repository
from db.models import Course as CourseDbModel
from elearning.courses.course import Course


@logger
class CourseRepository(Repository):
    def persist(self, aggregate: Course):
        CourseDbModel.objects.create(
            title=aggregate.title,
            description=aggregate.description,
            is_draft=aggregate.is_draft,
        )

    def list(self) -> List[Course]:
        course_modles = CourseDbModel.objects.all()

        return [
            Course(title=c.title, description=c.description, is_draft=c.is_draft)
            for c in course_modles
        ]

    def retrieve(self, id):
        try:
            course_model = CourseDbModel.objects.get(id=id)
            return Course(
                title=course_model.title,
                description=course_model.description,
                is_draft=course_model.is_draft,
            )
        except CourseDbModel.DoesNotExist as e:
            self.logger.error(e)
        return None
