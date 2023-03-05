from pydantic import BaseModel

from course_tracker.models import Course, CourseExercise, User
from course_tracker.read_models.exercise import ExerciseReadModel


class CourseReadModel(BaseModel):
    title: str
    description: str
    is_enrolled: bool
    is_completed: bool
    progress: int
    exercises: list[ExerciseReadModel]

    def __init__(self, course: Course, user: User, **kwargs) -> None:
        kwargs["title"] = course.title
        kwargs["description"] = course.description
        kwargs["is_enrolled"] = user.courseenrollment_set.filter(course=course).exists()
        kwargs["is_completed"] = self._calculate_is_completed(user)
        kwargs["exercises"] = self._get_exercises(course=course, user=user)
        kwargs["progress"] = self._calculate_progress(kwargs["exercises"])
        super().__init__(**kwargs)

    def _calculate_is_completed(self, user: User) -> bool:
        return False

    def _calculate_progress(self, exercises: list[ExerciseReadModel]) -> float:
        total_exercises = len(exercises)
        completed_exercises = len(
            list(filter(lambda exercise: exercise.is_completed, exercises))
        )
        print(total_exercises, completed_exercises)
        if total_exercises == 0:
            return 0
        return int((completed_exercises / total_exercises) * 100)

    def _get_exercises(self, course: Course, user: User):
        course_exercises = list(
            [
                ExerciseReadModel(course_exercise.exercise, user, course_exercise.order)
                for course_exercise in CourseExercise.objects.filter(course=course)
            ]
        )
        return course_exercises
