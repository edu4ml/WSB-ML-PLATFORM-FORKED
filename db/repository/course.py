from infra.repository import Repository
from db.models import Course as CourseDbModel
from elearning.courses.course import Course


class CourseRepository(Repository):
    def persist(self, aggregate: Course):
        CourseDbModel.objects.create(
            title=aggregate.title,
            description=aggregate.description,
            is_draft=aggregate.is_draft,
        )
