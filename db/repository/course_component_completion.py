from db.models.course import CourseComponentCompletion
from infra.repository import Repository


class CourseComponentCompletionRepository(Repository):
    root_model = CourseComponentCompletion
