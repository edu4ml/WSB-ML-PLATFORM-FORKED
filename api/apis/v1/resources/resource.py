from dataclasses import asdict

from api.apis.mixins import AuthMixin
from db.repository.external_resource import ExternalResourceRepository
from infra.exceptions import RequestException
from infra.permissions import api_has_one_of_the_roles
from shared.enums import UserRoles
from rest_framework import status
from rest_framework.response import Response


class ExternalResourceApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def get(self, request, format=None):
        resources = ExternalResourceRepository(request.user).list_all()
        serialized = [asdict(resource) for resource in resources]
        return Response(serialized, status.HTTP_200_OK)

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def post(self, request, format=None):
        try:
            resource = ExternalResourceRepository(request.user).create(
                **dict(
                    post_data=request.POST,
                    file_data=request.FILES,
                )
            )
            return Response(asdict(resource), status.HTTP_201_CREATED)
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


class ExternalResourceDetailApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def get(self, request, resource_uuid, format=None):
        resource = ExternalResourceRepository(request.user).get_by_uuid(resource_uuid)
        return Response(asdict(resource), status.HTTP_200_OK)

    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def post(self, request, resource_uuid, format=None):
        try:
            resource = ExternalResourceRepository(request.user).update_by_uuid(
                uuid=resource_uuid,
                **dict(
                    post_data=request.POST,
                    file_data=request.FILES,
                )
            )
            return Response(asdict(resource), status.HTTP_200_OK)
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
    def delete(self, request, resource_uuid, format=None):
        try:
            ExternalResourceRepository(request.user).delete_by_uuid(resource_uuid)
            return Response(dict(), status.HTTP_204_NO_CONTENT)
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
