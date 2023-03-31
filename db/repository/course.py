from db.models import (
    Course as CourseDbModel,
    CourseStep as CourseStepDbModel,
    CourseStepUserProgress as CourseStepUserProgressDbModel,
)
from elearning.coursing.course import Course as CourseDomainModel
from elearning.coursing.entities import CourseComponentCompletion, CourseStep
from elearning.coursing.entities.course_component import CourseComponent
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

    # def list_all(self) -> List[CourseDomainModel]:
    #     user_roles = self.user.roles.values_list("name", flat=True)

    #     # For admins, retrieve all courses
    #     if UserRoles.ADMIN in user_roles:
    #         course_models = CourseDbModel.objects.all()

    #     # For teachers, retrieve all published courses and all courses they authored
    #     elif UserRoles.TEACHER in user_roles:
    #         authored_courses = CourseDbModel.objects.filter(author=self.user)
    #         published_courses = CourseDbModel.objects.filter(is_draft=False)
    #         course_models = authored_courses | published_courses

    #     # For students, retrieve only published courses
    #     else:
    #         course_models = CourseDbModel.objects.filter(is_draft=False)
    #     return [self.from_model(c) for c in course_models]

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
            ExternalResource(
                uuid=resource.uuid,
                title=resource.title,
                url=resource.url,
                file_link=resource.file.url if resource.file else "",
                type=resource.type,
            )
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

        step_completion, _ = CourseStepUserProgressDbModel.objects.get_or_create(
            user=self.user,
            course=course,
            component=component,
        )

        return CourseComponentCompletion(
            tracking_uuid=step_completion.uuid,
            completed_at=step_completion.completed_at,
            is_completed=step_completion.is_completed,
        )
