from dataclasses import asdict
from uuid import UUID

from django.apps import apps
from rest_framework import status
from rest_framework.response import Response

from api.apis.mixins import AuthMixin
from db.repository.course import CourseRepository
from elearning.apps import APP_NAME
from infra.command_bus import CommandBus
from infra.exceptions import CommandBusException
from infra.permissions import api_has_one_of_the_roles
from shared.enums import UserRoles


class CourseApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def get(self, request, format=None):
        courses = CourseRepository(request.user).list_all()
        serialized = [asdict(course) for course in courses]
        return Response(serialized, status.HTTP_200_OK)

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def put(self, request, **kwargs):
        try:
            command_bus: CommandBus = apps.get_app_config(APP_NAME).command_bus
            course = command_bus.issue(request)
            return Response(asdict(course), status.HTTP_201_CREATED)
        except CommandBusException as e:
            return self._return_exception_response(e, request)


class CourseDetailApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def get(self, request, course_uuid: UUID, **kwargs):
        course = CourseRepository(request.user).get_by_uuid(uuid=course_uuid)
        if course:
            return Response(asdict(course), status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)

    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def post(self, request, course_uuid: UUID, **kwargs):
        try:
            command_bus: CommandBus = apps.get_app_config(APP_NAME).command_bus
            command_bus.issue(request, course_uuid=course_uuid)
            return Response(dict(), status.HTTP_202_ACCEPTED)
        except CommandBusException as e:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message=e.message,
                ),
                status=e.status_code,
            )
