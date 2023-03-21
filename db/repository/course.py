from typing import List
from uuid import UUID

from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType

from db.models import (
    Course as CourseDbModel,
    CourseEnrollment as CourseEnrollmentDbModel,
    CourseStep as CourseStepDbModel,
    CourseStepUserCompletion as CourseStepUserCompletionDbModel,
)
from elearning.coursing.course import Course
from elearning.coursing.entities import CourseComponentCompletion, CourseStep
from infra.logging import logger
from infra.repository import Repository
from shared.enums import UserRoles

User = get_user_model()


@logger
class CourseStepRepository(Repository):
    root_model = CourseStepDbModel


@logger
class CourseStepUserCompletionRepository(Repository):
    root_model = CourseStepUserCompletionDbModel


@logger
class CourseRepository(Repository):
    """
    Abstraction layer to retrieve, persist and update
    the domain entity of course object and related models
    """

    root_model = CourseDbModel
    course_step: CourseStepRepository
    course_step_user_completion: CourseStepUserCompletionRepository

    def __init__(self, user=None) -> None:
        super().__init__(user)
        self.course_step = CourseStepRepository(user=user)
        self.course_step_user_completion = CourseStepUserCompletionRepository(user=user)

    def persist(self, aggregate: Course):
        obj = CourseDbModel.objects.create(
            title=aggregate.title,
            description=aggregate.description,
            is_draft=aggregate.is_draft,
        )
        return self._prepare_domain_entity(obj)

    def update(self, entity: Course):
        course = CourseDbModel.objects.get(uuid=entity.uuid)

        if entity.description is not None:
            course.description = entity.description

        if entity.title is not None:
            course.title = entity.title

        if entity.is_draft is not None:
            course.is_draft = entity.is_draft

        if entity.steps is not None:
            self._update_course_steps(course, entity.steps)

        course.save()

    def list(self) -> List[Course]:
        course_modles = CourseDbModel.objects.all()
        return [self._prepare_domain_entity(c) for c in course_modles]

    def list(self) -> List[Course]:
        user_roles = self.user.roles.values_list("name", flat=True)

        if UserRoles.ADMIN in user_roles or UserRoles.TEACHER in user_roles:
            course_models = CourseDbModel.objects.all()
        else:
            course_models = CourseDbModel.objects.filter(is_draft=False)
        return [self._prepare_domain_entity(c) for c in course_models]

    def retrieve(self, uuid: UUID):
        try:
            return self._prepare_domain_entity(CourseDbModel.objects.get(uuid=uuid))
        except CourseDbModel.DoesNotExist as e:
            self.logger.error(e)
        return None

    def create_enrollment(self, course_uuid, user_uuid):
        CourseEnrollmentDbModel.objects.create(
            course=CourseDbModel.objects.get(uuid=course_uuid),
            user=User.objects.get(uuid=user_uuid),
        )

    def complete_step_for_user(self, course_step_user_completion_uuid):
        with self.course_step_user_completion.with_obj(
            course_step_user_completion_uuid
        ) as obj:
            obj.is_completed = True

    # -----------------------------------------------------

    def _update_course_steps(self, course, new_steps):
        course.coursestep_set.all().delete()

        for new_step in new_steps:
            CourseStepDbModel.objects.create(
                order=new_step.order,
                course=course,
                object_uuid=new_step.uuid,
                content_type=ContentType.objects.get(model=new_step.content_type),
            )

    def _prepare_domain_entity(self, course: CourseDbModel) -> Course:
        return Course(
            uuid=course.uuid,
            created_at=course.created_at,
            updated_at=course.updated_at,
            title=course.title,
            description=course.description,
            is_draft=course.is_draft,
            is_enrolled=self._is_enrolled(course),
            steps=self._get_course_steps(course),
        )

    def _is_enrolled(self, course):
        if not self.user:
            return False
        return CourseEnrollmentDbModel.objects.filter(
            user=self.user, course=course
        ).exists()

    def _get_course_steps(self, course):
        return [
            CourseStep(
                uuid=step.object_uuid,
                content_type=step.content_type.model,
                title=step.object.title,
                description=step.object.description,
                order=step.order,
                resources=self._get_resources(step.object),
                is_self_evaluated=step.is_self_evaluated,
                requires_manual_review=step.requires_manual_review,
                user_progress=self._get_user_progress_on_component(
                    course=course, course_step=step.object
                ),
            )
            for step in CourseStepDbModel.objects.filter(course=course)
        ]

    def _get_resources(self, step_in_course):
        # if resources := getattr(step_in_course, "resources", None):
        if hasattr(step_in_course, "resources"):
            return [
                dict(title=resource.title, url=resource.url)
                for resource in step_in_course.resources.all()
            ]
        return []

    def _get_user_progress_on_component(self, course, course_step):
        # whole key is passed here so it is safe to do get_or_create here
        if not self.user:
            return CourseComponentCompletion(
                tracking_uuid=None,
                completed_at=None,
                is_completed=None,
            )

        step_completion, _ = CourseStepUserCompletionDbModel.objects.get_or_create(
            user=self.user,
            course=course,
            object_uuid=course_step.uuid,
            content_type=course_step.content_type,
        )

        return CourseComponentCompletion(
            tracking_uuid=step_completion.uuid,
            completed_at=step_completion.completed_at,
            is_completed=step_completion.is_completed,
        )
