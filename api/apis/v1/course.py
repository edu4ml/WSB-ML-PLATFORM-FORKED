from dataclasses import asdict
from uuid import UUID

from django.apps import apps
from rest_framework import status
from rest_framework.response import Response

from api.apis.mixins import AuthMixin
from db.repository.course import CourseRepository
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
        except NotImplementedError:
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
        except NotImplementedError:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message="NotImplemented",
                ),
                status.HTTP_501_NOT_IMPLEMENTED,
            )


class CourseComponentApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def get(self, request, **kwargs):
        components = CourseRepository(request.user).course_component_CRUD.list()
        serialized = [asdict(i) for i in components]
        return Response(serialized, status=status.HTTP_200_OK)

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def post(self, request, **kwargs):
        try:
            component = CourseRepository(request.user).course_component_CRUD.create(
                **request.data
            )
            return Response(asdict(component), status.HTTP_201_CREATED)
        except AssertionError:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message="Missing required fields",
                ),
                status.HTTP_400_BAD_REQUEST,
            )


class CourseComponentDetailApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def get(self, request, component_uuid: UUID, **kwargs):

        component = CourseRepository(request.user).course_component_CRUD.retrieve(
            uuid=component_uuid
        )
        if component:
            return Response(asdict(component), status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def put(self, request, component_uuid: UUID, **kwargs):
        try:

            component = CourseRepository(request.user).course_component_CRUD.update(
                obj_uuid=component_uuid,
                **request.data,
            )
            return Response(asdict(component), status.HTTP_200_OK)
        except KeyError:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message="Missing required fields",
                ),
                status.HTTP_400_BAD_REQUEST,
            )

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def delete(self, request, component_uuid: UUID, **kwargs):
        CourseRepository(request.user).course_component_CRUD.delete(uuid=component_uuid)
        return Response(dict(), status.HTTP_204_NO_CONTENT)
