from pydantic import BaseModel

from course_tracker.models import Exercise, Resource, User
from course_tracker.models.exercise_completion import ExerciseCompletion
from course_tracker.read_models import ResourceReadModel


class ExerciseReadModel(BaseModel):
    title: str
    description: str
    resources: list[ResourceReadModel]
    is_completed: bool

    def __init__(self, exercise: Exercise, user: User, **kwargs) -> None:
        kwargs["title"] = exercise.title
        kwargs["description"] = exercise.description
        kwargs["resources"] = self._get_resources(exercise=exercise)
        kwargs["is_completed"] = ExerciseCompletion.objects.filter(
            exercise=exercise, user=user
        ).exists()
        super().__init__(**kwargs)

    def _get_resources(self, exercise: Exercise):
        return [
            ResourceReadModel(resource)
            for resource in Resource.objects.filter(exercise=exercise)
        ]
