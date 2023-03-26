from typing import List
from uuid import UUID


from db.models import (
    Course as CourseDbModel,
    CourseEnrollment as CourseEnrollmentDbModel,
    CourseStep as CourseStepDbModel,
    CourseStepUserCompletion as CourseStepUserCompletionDbModel,
)
from elearning.coursing.course import Course
from elearning.coursing.entities import CourseComponentCompletion, CourseStep
from elearning.coursing.entities.course_component import CourseComponent
from infra.logging import logger
from infra.repository import Repository
from shared.enums import UserRoles


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

    root_model = Course
    course_step: CourseStepRepository
    course_step_user_completion: CourseStepUserCompletionRepository

    def __init__(self, user=None) -> None:
        super().__init__(user)
        self.course_step = CourseStepRepository(user=user)
        self.course_step_user_completion = CourseStepUserCompletionRepository(user=user)

    def persist(self, course: Course):
        obj = CourseDbModel.objects.create(
            title=course.title,
            description=course.description,
            is_draft=course.is_draft,
            author_id=course.author,
        )
        return self._from_model(obj)

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
        user_roles = self.user.roles.values_list("name", flat=True)

        if UserRoles.ADMIN in user_roles or UserRoles.TEACHER in user_roles:
            course_models = CourseDbModel.objects.all()
        else:
            course_models = CourseDbModel.objects.filter(is_draft=False)
        return [self._from_model(c) for c in course_models]

    def retrieve(self, uuid: UUID):
        try:
            return self._from_model(CourseDbModel.objects.get(uuid=uuid))
        except CourseDbModel.DoesNotExist as e:
            self.logger.error(e)
        return None

    def create_enrollment(self, course_uuid, user_uuid):
        return CourseEnrollmentDbModel.objects.create(
            course_id=course_uuid,
            user_id=user_uuid,
        )

    def complete_step_for_user(self, course_step_user_completion_uuid):
        with self.course_step_user_completion.with_obj(
            course_step_user_completion_uuid
        ) as obj:
            obj.is_completed = True

    # -----------------------------------------------------

    def _update_course_steps(self, course: Course, new_steps: List[CourseStep]):
        course.steps.all().delete()

        for new_step in new_steps:
            CourseStepDbModel.objects.create(
                course=course,
                order=new_step.order,
                component_id=new_step.component,
                evaluation_type=new_step.evaluation_type,
            )

    def _from_model(self, course: CourseDbModel) -> Course:
        return Course(
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
                order=step.order,
                user_progress=self._get_user_progress_on_component(
                    course=course, component=step.component
                ),
                evaluation_type=step.evaluation_type,
                component=CourseComponent(
                    uuid=step.component.uuid,
                    title=step.component.title,
                    description=step.component.description,
                    type=step.component.type,
                    resources=self._get_resources(step.component),
                ),
            )
            for step in course.steps.all()
        ]

    def _get_resources(self, component):
        return [
            dict(title=resource.title, url=resource.url)
            for resource in component.resources.all()
        ]

    def _get_user_progress_on_component(self, course, component):
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
            component=component,
        )

        return CourseComponentCompletion(
            tracking_uuid=step_completion.uuid,
            completed_at=step_completion.completed_at,
            is_completed=step_completion.is_completed,
        )
