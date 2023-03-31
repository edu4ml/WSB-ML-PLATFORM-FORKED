from dataclasses import asdict
from uuid import UUID

from rest_framework import status
from rest_framework.response import Response

from api.apis.mixins import AuthMixin
from db.repository.course_component import (
    CourseComponentRepo,
)
from infra.permissions import api_has_one_of_the_roles
from shared.enums import UserRoles


class CourseComponentApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def get(self, request, **kwargs):
        components = CourseComponentRepo(request.user).listAll()
        serialized = [asdict(i) for i in components]
        return Response(serialized, status=status.HTTP_200_OK)

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def post(self, request, **kwargs):
        try:
            component = CourseComponentRepo(request.user).create(**request.data)
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

        component = CourseComponentRepo(request.user).getByUUID(component_uuid)
        if component:
            return Response(asdict(component), status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def put(self, request, component_uuid: UUID, **kwargs):
        try:

            component = CourseComponentRepo(request.user).updateByUUID(
                uuid=component_uuid,
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
        CourseComponentRepo(request.user).deleteByUUID(uuid=component_uuid)
        return Response(dict(), status.HTTP_204_NO_CONTENT)


class CourseComponentDetailFileUploadApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def post(self, request, component_uuid: UUID, **kwargs):
        try:
            CourseComponentRepo(request.user).add_resource(
                component_uuid=component_uuid,
                payload=dict(
                    post_data=request.POST,
                    file_data=request.FILES,
                ),
            )

            return Response({}, status.HTTP_201_CREATED)
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


class CourseComponentDetailFileDetailApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def delete(self, request, component_uuid: UUID, resource_uuid: UUID, **kwargs):
        try:
            CourseComponentRepo(request.user).remove_resource(
                component_uuid=component_uuid,
                resource_uuid=resource_uuid,
            )

            return Response({}, status.HTTP_200_OK)
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
