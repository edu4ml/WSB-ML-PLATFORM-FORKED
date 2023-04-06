from typing import List
from db.models import (
    Course as CourseDbModel,
    CourseStep as CourseStepDbModel,
    CourseStepUserProgress as CourseStepUserProgressDbModel,
)
from elearning.entities.course import Course as CourseDomainModel
from elearning.entities import CourseStepUserProgress, CourseStep
from elearning.entities.component import Component
from elearning.entities.submission import Submission
from elearning.entities.external_resource import ExternalResource
from infra.logging import logger
from infra.repository import ModelRepository


@logger
class CourseRepository(ModelRepository[CourseDbModel]):
    db_model = CourseDbModel
    domain_model = CourseDomainModel

    def update_with_entity(self, entity: CourseDomainModel):
        # fix me. Not sure why but I dont like it
        course = CourseDbModel.objects.get(uuid=entity.uuid)

        if entity.description is not None:
            course.description = entity.description

        if entity.title is not None:
            course.title = entity.title

        if entity.is_draft is not None:
            course.is_draft = entity.is_draft
        course.save()
        return self.from_model(course)

    def update_course_steps(self, uuid, steps: List[CourseStep]):
        course = CourseDbModel.objects.get(uuid=uuid)
        course.steps.all().delete()
        for new_step in steps:
            CourseStepDbModel.objects.create(
                course=course,
                order=new_step.order,
                component_id=new_step.component,
                evaluation_type=new_step.evaluation_type,
            )
        return self.from_model(course)

    def from_model(self, course):
        return self.domain_model(
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

    def publish(self, uuid):
        obj = self.db_model.objects.get(uuid=uuid)
        obj.is_draft = False
        obj.save()
        return self.from_model(obj)

    def _get_course_steps(self, course):
        return [
            CourseStep(
                uuid=step.uuid,
                order=step.order,
                user_progress=self._get_user_progress(step=step),
                evaluation_type=step.evaluation_type,
                component=Component(
                    author=step.component.author.uuid,
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
        if step_progress_exists := CourseStepUserProgressDbModel.objects.filter(
            user=self.user, step=step
        ).exists():
            step_progress = CourseStepUserProgressDbModel.objects.get(
                user=self.user, step=step
            )

        if not self.user or not step_progress_exists:
            return CourseStepUserProgress(
                tracking_uuid=None,
                completed_at=None,
                is_completed=None,
                is_blocked=None,
                submissions=[],
            )

        return CourseStepUserProgress(
            tracking_uuid=step_progress.uuid,
            completed_at=step_progress.completed_at,
            is_completed=step_progress.is_completed,
            is_blocked=step_progress.is_blocked,
            submissions=[
                Submission(
                    uuid=attempt.uuid,
                    title=attempt.title,
                    description=attempt.description,
                    file_link=attempt.file.url if attempt.file else "",
                    status=attempt.status,
                )
                for attempt in step.submissions.filter(user=step_progress.user)
            ],
        )
