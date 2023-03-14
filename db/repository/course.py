from typing import List
from elearning.coursing.entities import CourseStep, CourseComponentCompletion
from infra.logging import logger
from infra.repository import Repository
from db.models import (
    Course as CourseDbModel,
    CourseEnrollment as CourseEnrollmentDbModel,
    CourseStep as CourseStepDbModel,
    CourseComponentCompletion as CourseComponentCompletionDbModel,
)
from elearning.coursing.course import Course
from django.contrib.auth import get_user_model

User = get_user_model()


@logger
class CourseRepository(Repository):
    """
    Abstraction layer to retrieve the domain entity of course object
    """

    root_model = CourseDbModel

    def persist(self, aggregate: Course):
        CourseDbModel.objects.create(
            title=aggregate.title,
            description=aggregate.description,
            is_draft=aggregate.is_draft,
        )

    def list(self) -> List[Course]:
        course_modles = CourseDbModel.objects.all()
        return [self._prepare_domain_entity(c) for c in course_modles]

    def retrieve(self, id):
        try:
            return self._prepare_domain_entity(CourseDbModel.objects.get(id=id))
        except CourseDbModel.DoesNotExist as e:
            self.logger.error(e)
        return None

    def create_enrollment(self, course_id, user_id):
        CourseEnrollmentDbModel.objects.create(
            course=CourseDbModel.objects.get(id=course_id),
            user=User.objects.get(id=user_id),
        )

    def _prepare_domain_entity(self, course) -> Course:
        return Course(
            id=course.id,
            title=course.title,
            description=course.description,
            is_draft=course.is_draft,
            is_enrolled=self._is_enrolled(course),
            steps=self._course_steps(course),
        )

    def _is_enrolled(self, course):
        if not self.user:
            return False
        return CourseEnrollmentDbModel.objects.filter(
            user=self.user, course=course
        ).exists()

    def _course_steps(self, course):
        return [
            CourseStep(
                title=step.component.title,
                description=step.component.description,
                order=step.order,
                resources=self._get_resources(step.component),
                is_self_evaluated=step.is_self_evaluated,
                requires_manual_review=step.requires_manual_review,
                user_progress=self._get_user_progress_on_component(
                    component=step.component
                ),
            )
            for step in CourseStepDbModel.objects.filter(course=course)
        ]

    def _get_resources(self, component):
        return [
            dict(title=resource.title, url=resource.url)
            for resource in component.resources.all()
        ]

    def _get_user_progress_on_component(self, component):
        component, _ = CourseComponentCompletionDbModel.objects.get_or_create(
            user=self.user, component=component
        )

        return CourseComponentCompletion(
            tracking_id=component.id,
            completed_at=component.completed_at,
            is_completed=component.is_completed,
        )
