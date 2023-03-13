from .course import CourseRepository
from .course_step import CourseStepRepository
from .course_component_completion import CourseComponentCompletionRepository


class RepositoryRoot:
    def __init__(self) -> None:
        self.course = CourseRepository()
        self.course_step = CourseStepRepository()
        self.course_component_completion = CourseComponentCompletionRepository()
