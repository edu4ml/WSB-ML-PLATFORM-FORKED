from dataclasses import asdict
from uuid import UUID

from django.apps import apps
from rest_framework import status
from rest_framework.response import Response

from api.apis.mixins import AuthMixin
from db.repository.course import CourseRepository
from db.repository.evaluation import EvaluationRepository
from db.repository.exercise import ExerciseRepository
from elearning.apps import APP_NAME
from infra.command_bus import CommandBus
from infra.permissions import api_has_one_of_the_roles
from shared.enums import UserRoles


class CourseApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def get(self, request, format=None):
        courses = CourseRepository(request.user).list()
        serialized = [asdict(course) for course in courses]
        return Response(serialized, status.HTTP_200_OK)

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def put(self, request, **kwargs):
        try:
            command_bus: CommandBus = apps.get_app_config(APP_NAME).command_bus
            course = command_bus.issue(request)
            return Response(asdict(course), status.HTTP_201_CREATED)
        except NotImplementedError as e:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message="NotImplemented",
                ),
                status.HTTP_501_NOT_IMPLEMENTED,
            )


class CourseDetailApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def get(self, request, course_uuid: UUID, **kwargs):
        course = CourseRepository(request.user).retrieve(uuid=course_uuid)
        if course:
            return Response(asdict(course), status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)


class CourseCommandApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def put(self, request, course_uuid: UUID, **kwargs):
        try:
            command_bus: CommandBus = apps.get_app_config(APP_NAME).command_bus
            command_bus.issue(request, course_uuid=course_uuid)
            return Response(dict(), status.HTTP_202_ACCEPTED)
        except NotImplementedError as e:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message="NotImplemented",
                ),
                status.HTTP_501_NOT_IMPLEMENTED,
            )


class CourseStepApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def get(self, request, **kwargs):
        exercises = ExerciseRepository(request.user).list()
        evaluations = EvaluationRepository(request.user).list()

        serialized = [asdict(i) for i in [*exercises, *evaluations]]
        return Response(serialized, status=status.HTTP_200_OK)
