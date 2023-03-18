from .course import CourseRepository


class RepositoryRoot:
    def __init__(self) -> None:
        self.course: CourseRepository = CourseRepository()
