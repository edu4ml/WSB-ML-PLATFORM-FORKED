from typing import List
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

    def list(self) -> List[Course]:
        course_modles = CourseDbModel.objects.all()

        return [
            Course(title=c.title, description=c.description, is_draft=c.is_draft)
            for c in course_modles
        ]
