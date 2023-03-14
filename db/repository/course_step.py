from db.models.courses import CourseStep
from infra.repository import Repository


class CourseStepRepository(Repository):
    root_model = CourseStep
