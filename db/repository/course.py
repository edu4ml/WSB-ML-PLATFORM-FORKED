from db.models import (
    Course as CourseDbModel,
    CourseStep as CourseStepDbModel,
    CourseStepUserProgress as CourseStepUserProgressDbModel,
)
from elearning.coursing.course import Course as CourseDomainModel
from elearning.coursing.entities import CourseStepUserProgress, CourseStep
from elearning.coursing.entities.course_component import CourseComponent
from elearning.coursing.entities.evaluation_attempt import EvaluationAttempt
from elearning.coursing.entities.external_resource import ExternalResource
from infra.logging import logger
from infra.repository import ModelRepository


@logger
class CourseRepository(ModelRepository[CourseDbModel]):
    """
    Abstraction layer to retrieve, persist and update
    the domain entity of course object and related models
    """

    root_model = CourseDbModel
    root_entity = CourseDomainModel

    def __init__(self, user=None) -> None:
        super().__init__(user)

    def update_with_entity(self, entity: CourseDomainModel):
        # fix me. Not sure why but I dont like it
        course = CourseDbModel.objects.get(uuid=entity.uuid)

        if entity.description is not None:
            course.description = entity.description

        if entity.title is not None:
            course.title = entity.title

        if entity.is_draft is not None:
            course.is_draft = entity.is_draft

        if entity.steps is not None:
            course.steps.all().delete()

            for new_step in entity.steps:
                CourseStepDbModel.objects.create(
                    course=course,
                    order=new_step.order,
                    component_id=new_step.component,
                    evaluation_type=new_step.evaluation_type,
                )

        course.save()

    def from_model(self, course):
        return self.root_entity(
            uuid=course.uuid,
            created_at=course.created_at,
            updated_at=course.updated_at,
            title=course.title,
            author=course.author.uuid,
            description=course.description,
            is_draft=course.is_draft,
            is_enrolled=course.enrollments.filter(user=self.user).exists(),
            steps=self._get_course_steps(course),
        )

    def _get_course_steps(self, course):
        return [
            CourseStep(
                uuid=step.uuid,
                order=step.order,
                user_progress=self._get_user_progress(step=step),
                evaluation_type=step.evaluation_type,
                component=CourseComponent(
                    uuid=step.component.uuid,
                    title=step.component.title,
                    description=step.component.description,
                    type=step.component.type,
                    created_at=step.component.created_at,
                    resources=self._get_resources(step.component),
                ),
            )
            for step in course.steps.all()
        ]

    def _get_resources(self, component):
        return [
            ExternalResource(
                uuid=resource.uuid,
                title=resource.title,
                url=resource.url,
                file_link=resource.file.url if resource.file else "",
                type=resource.type,
            )
            for resource in component.resources.all()
        ]

    def _get_user_progress(self, step):
        # whole key is passed here so it is safe to do get_or_create here
        if not self.user:
            return CourseStepUserProgress(
                tracking_uuid=None, completed_at=None, is_completed=None, submissions=[]
            )

        step_progress, _ = CourseStepUserProgressDbModel.objects.get_or_create(
            user=self.user,
            # course=step.course,
            step=step,
        )

        return CourseStepUserProgress(
            tracking_uuid=step_progress.uuid,
            completed_at=step_progress.completed_at,
            is_completed=step_progress.is_completed,
            submissions=[
                EvaluationAttempt(
                    uuid=attempt.uuid,
                    title=attempt.title,
                    description=attempt.description,
                    file_link=attempt.file.url if attempt.file else "",
                    status=attempt.status,
                )
                for attempt in step.evaluation_attempts.filter(user=step_progress.user)
            ],
        )
