from dataclasses import asdict
from typing import Any
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from elearning.apps import APP_NAME
from django.apps import apps
from rest_framework import status

from infra.command_bus import CommandBus
from infra.exceptions import CommandBusException


class AuthMixin(APIView):
    permission_classes = [IsAuthenticated]

    command_bus: CommandBus

    def _return_exception_response(self, exception, request):
        return Response(
            dict(
                error=True,
                success=False,
                payload=request.data,
                message=exception.message,
            ),
            status=exception.status_code,
        )

    def __init__(self, **kwargs: Any) -> None:
        self.command_bus: CommandBus = apps.get_app_config(APP_NAME).command_bus
        super().__init__(**kwargs)

    def post(self, request, **kwargs):
        try:
            resource = self.command_bus.issue(request, **kwargs)
            return Response(asdict(resource), status.HTTP_202_ACCEPTED)
        except CommandBusException as e:
            return self._return_exception_response(e, request)
