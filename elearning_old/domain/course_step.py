from pydantic import BaseModel

from course_tracker.models import (
    Course,
    CourseStep,
    CourseComponent,
    CourseComponentCompletion,
    User,
)
from course_tracker.domain import Resource
from course_tracker.domain.exercise_required_evaluation import (
    ExerciseRequiredEvaluation,
    ExerciseRequiredEvaluationType,
)


class CourseStep(BaseModel):
    id: int
    type: str
    order: int
    title: str
    description: str
    is_completed: bool = False
    is_self_evaluated: bool = False
    is_blocked: bool = True
    resources: list[Resource]
    requirements: list[ExerciseRequiredEvaluation]

    def __init__(
        self, component: CourseComponent, step: CourseStep, user: User, **kwargs
    ) -> None:
        exercise_completion, _ = CourseComponentCompletion.objects.get_or_create(
            component=step.component, user=user
        )

        kwargs["id"] = component.id
        kwargs["type"] = component.type
        kwargs["order"] = step.order
        kwargs["title"] = component.title
        kwargs["description"] = component.description
        kwargs["is_completed"] = exercise_completion.is_completed
        kwargs["is_self_evaluated"] = step.is_self_evaluated
        kwargs["is_blocked"] = self._calculate_is_blocked(step=step, user=user)
        kwargs["resources"] = self._get_resources(learning_step=component)
        kwargs["requirements"] = self._build_requirements(user, component)

        super().__init__(**kwargs)

    def _calculate_is_blocked(self, step: CourseStep, user: User):
        if step.order == 1:
            return False
        else:
            # If previous exercise in course is blocked, mark this as blocked. Otherwise available
            previous_step = CourseStep.objects.get(
                order=step.order - 1, course=step.course
            )
            return not CourseComponentCompletion.objects.get(
                component=previous_step.component, user=user
            ).is_completed

    def _get_resources(self, learning_step: CourseComponent):
        return [Resource(resource) for resource in learning_step.resources.all()]

    def _build_requirements(self, user: User, exercise: CourseComponent):
        """
        First, build system with no requirements!
        """
        return []
        requirements = []
        if exercise.requires_file:
            requirements.append(
                ExerciseRequiredEvaluation(
                    ExerciseRequiredEvaluationType.FILE, user=user, exercise=exercise
                )
            )
        if exercise.requires_test:
            requirements.append(
                ExerciseRequiredEvaluation(
                    ExerciseRequiredEvaluationType.TEST, user=user, exercise=exercise
                )
            )
        if exercise.requires_manual_review:
            requirements.append(
                ExerciseRequiredEvaluation(
                    ExerciseRequiredEvaluationType.MANUAL, user=user, exercise=exercise
                )
            )
        return requirements
