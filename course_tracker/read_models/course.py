from pydantic import BaseModel

from course_tracker.models import Course, CourseExercise, User
from course_tracker.read_models.exercise import ExerciseReadModel


class CourseReadModel(BaseModel):
    title: str
    description: str
    is_enrolled: bool
    is_completed: bool
    progress: float
    exercises: list[tuple[int, ExerciseReadModel]]

    def __init__(self, course: Course, user: User, **kwargs) -> None:
        kwargs["title"] = course.title
        kwargs["description"] = course.description
        kwargs["is_enrolled"] = user.courseenrollment_set.filter(course=course).exists()
        kwargs["is_completed"] = self._calculate_is_completed(user)
        kwargs["progress"] = self._calculate_progress(user)
        kwargs["exercises"] = self._calculate_exercises_status(course=course, user=user)
        super().__init__(**kwargs)

    def _calculate_is_completed(self, user: User) -> bool:
        return False

    def _calculate_progress(self, user) -> float:
        return 0.4

    def _calculate_exercises_status(self, course: Course, user: User):
        course_exercises = list(
            [
                (
                    course_exercise.order,
                    ExerciseReadModel(course_exercise.exercise, user),
                )
                for course_exercise in CourseExercise.objects.filter(course=course)
            ]
        )
        return course_exercises
