from dataclasses import asdict
from uuid import UUID
from api.apis.mixins import AuthMixin
from db.repository.submission import SubmissionRepository
from infra.command_bus import CommandBus
from infra.exceptions import CommandBusException, RequestException
from infra.permissions import api_has_one_of_the_roles
from shared.enums import UserRoles
from elearning.apps import APP_NAME
from django.apps import apps

from rest_framework import status
from rest_framework.response import Response


class SubmissionApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def get(self, request, format=None):
        try:
            submissions = SubmissionRepository(request.user).list_all()
            serialized = [asdict(submission) for submission in submissions]
            return Response(serialized, status.HTTP_200_OK)
        except RequestException as e:
            return self._return_exception_response(e, request)

    @api_has_one_of_the_roles([UserRoles.TEACHER, UserRoles.STUDENT])
    def post(self, request, **kwargs):
        try:
            command_bus: CommandBus = apps.get_app_config(APP_NAME).command_bus
            submission = command_bus.issue(request)
            return Response(asdict(submission), status.HTTP_202_ACCEPTED)
        except CommandBusException as e:
            return self._return_exception_response(e, request)


class SubmissionDetailApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def get(self, request, submission_uuid: UUID, format=None):
        try:
            submission = SubmissionRepository(request.user).get_by_uuid(
                uuid=submission_uuid
            )
            if submission is None:
                raise RequestException(
                    f"Object not found with uuid:{submission_uuid}",
                    status_code=404,
                )

            return Response(asdict(submission), status.HTTP_200_OK)
        except RequestException as e:
            return self._return_exception_response(e, request)
