from dataclasses import asdict
from uuid import UUID

from rest_framework import status
from rest_framework.response import Response

from api.apis.mixins import AuthMixin
from db.repository.course import CourseRepository
from db.repository.course_step_user_progress import CourseStepUserProgressRepository
from infra.permissions import api_has_one_of_the_roles
from shared.enums import UserRoles


class CourseStepApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def get(self, request, course_uuid: UUID, **kwargs):
        course = CourseRepository(request.user).get_by_uuid(uuid=course_uuid)
        serialized = [asdict(step) for step in course.steps]
        return Response(serialized, status.HTTP_200_OK)


class CourseStepDetailApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def get(self, request, course_uuid: UUID, step_uuid: UUID, **kwargs):
        course = CourseRepository(request.user).get_by_uuid(uuid=course_uuid)
        step = list(filter(lambda step: step.uuid == step_uuid, course.steps))[0]
        return Response(asdict(step), status.HTTP_200_OK)


class CourseStepDetailSubmissionsApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def get(self, request, course_uuid: UUID, step_uuid: UUID, **kwargs):
        course = CourseRepository(request.user).get_by_uuid(uuid=course_uuid)
        step = list(filter(lambda step: step.uuid == step_uuid, course.steps))[0]
        return Response(
            asdict(step)["user_progress"]["submissions"], status.HTTP_200_OK
        )


class CourseStepUserProgressDetailsApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def get(self, request, user_progress_uuid: UUID, **kwargs):
        user_progress = CourseStepUserProgressRepository(user=request.user).get_by_uuid(
            uuid=user_progress_uuid
        )
        return Response(asdict(user_progress), status.HTTP_200_OK)


class CourseStepUserProgressSubmissionUploadApi(AuthMixin):
    pass
