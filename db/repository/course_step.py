from db.models.course import CourseStep
from infra.repository import Repository


class CourseStepRepository(Repository):
    root_model = CourseStep
