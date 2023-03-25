from typing import List
from uuid import UUID


from db.models import (
    Course as CourseDbModel,
    CourseEnrollment as CourseEnrollmentDbModel,
    CourseStep as CourseStepDbModel,
    CourseStepUserCompletion as CourseStepUserCompletionDbModel,
    CourseComponent as CourseComponentDbModel,
    CustomUser as User,
)
from elearning.coursing.course import Course
from elearning.coursing.entities import CourseComponentCompletion, CourseStep
from elearning.coursing.entities.course_component import CourseComponent
from elearning.coursing.entities.course_step import CourseStepComponent
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
class CourseComponentRepository(Repository):
    root_model = CourseComponentDbModel

    def list(self):
        return [
            CourseComponent(
                uuid=component.uuid,
                title=component.title,
                description=component.description,
                type=component.type,
                resources=self._get_resources(component),
            )
            for component in self.root_model.objects.all()
        ]

    def _get_resources(self, component):
        return [
            dict(
                title=resource.title,
                url=resource.url,
            )
            for resource in component.resources.all()
        ]


@logger
class CourseRepository(Repository):
    """
    Abstraction layer to retrieve, persist and update
    the domain entity of course object and related models
    """

    root_model = Course
    course_step: CourseStepRepository
    course_step_user_completion: CourseStepUserCompletionRepository
    course_component: CourseComponentRepository

    def __init__(self, user=None) -> None:
        super().__init__(user)
        self.course_step = CourseStepRepository(user=user)
        self.course_step_user_completion = CourseStepUserCompletionRepository(user=user)
        self.course_component = CourseComponentRepository(user=user)

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

    def _update_course_steps(self, course: Course, new_steps: List[CourseStep]):
        course.steps.all().delete()

        for new_step in new_steps:
            CourseStepDbModel.objects.create(
                course=course,
                order=new_step.order,
                component_id=new_step.component,
                evaluation_type=new_step.evaluation_type,
            )

    def _prepare_domain_entity(self, course: Course) -> Course:
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
                order=step.order,
                user_progress=self._get_user_progress_on_component(
                    course=course, component=step.component
                ),
                evaluation_type=step.evaluation_type,
                component=CourseStepComponent(
                    title=step.component.title,
                    description=step.component.description,
                    type=step.component.type,
                    resources=self._get_resources(step.component),
                ),
            )
            for step in CourseStepDbModel.objects.filter(course=course)
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
