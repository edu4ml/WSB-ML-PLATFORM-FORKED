from uuid import UUID

from django.apps import apps
from rest_framework import status
from rest_framework.response import Response

from api.apis.mixins import AuthMixin
from elearning.apps import APP_NAME
from infra.command_bus import CommandBus
from infra.exceptions import (
    CommandBusException,
)
from infra.permissions import api_has_one_of_the_roles
from shared.enums import UserRoles


class CourseCommandApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def put(self, request, course_uuid: UUID, **kwargs):
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
