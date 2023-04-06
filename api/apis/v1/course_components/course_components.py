from dataclasses import asdict
from uuid import UUID

from rest_framework import status
from rest_framework.response import Response

from api.apis.mixins import AuthMixin
from db.repository.component import (
    ComponentRepo,
)
from infra.exceptions import RequestException
from infra.permissions import api_has_one_of_the_roles
from shared.enums import UserRoles


class CourseComponentApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def get(self, request, **kwargs):
        components = ComponentRepo(request.user).list_all()
        serialized = [asdict(i) for i in components]
        return Response(serialized, status=status.HTTP_200_OK)


class CourseComponentDetailApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def get(self, request, component_uuid: UUID, **kwargs):

        component = ComponentRepo(request.user).get_by_uuid(component_uuid)
        if component:
            return Response(asdict(component), status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def post(self, request, component_uuid: UUID, **kwargs):
        try:
            component = ComponentRepo(request.user).update_by_uuid(
                uuid=component_uuid,
                **request.data,
            )
            return Response(asdict(component), status.HTTP_200_OK)
        except RequestException as e:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message=e.message,
                ),
                status=e.status_code,
            )

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def delete(self, request, component_uuid: UUID, **kwargs):
        ComponentRepo(request.user).delete_by_uuid(uuid=component_uuid)
        return Response(dict(), status.HTTP_204_NO_CONTENT)


class CourseComponentDetailFileUploadApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def post(self, request, component_uuid: UUID, **kwargs):
        try:
            component = ComponentRepo(request.user).add_file_resource(
                component_uuid=component_uuid,
                payload=dict(
                    post_data=request.POST,
                    file_data=request.FILES,
                ),
            )
            return Response(asdict(component), status.HTTP_202_ACCEPTED)
        except RequestException as e:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message=e.message,
                ),
                status=e.status_code,
            )


class CourseComponentDetailFileDetailApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def delete(self, request, component_uuid: UUID, resource_uuid: UUID, **kwargs):
        try:
            ComponentRepo(request.user).remove_resource(
                component_uuid=component_uuid,
                resource_uuid=resource_uuid,
            )

            return Response({}, status.HTTP_200_OK)
        except RequestException as e:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message=e.message,
                ),
                status=e.status_code,
            )
