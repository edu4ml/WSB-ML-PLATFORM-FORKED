from rest_framework import status
from rest_framework.response import Response
from dataclasses import asdict
from api.apis.mixins import AuthMixin
from db.repository.report import ReportRepository

from infra.permissions import api_has_one_of_the_roles
from shared.enums import UserRoles


class DashboardApi(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def get(self, request, format=None):

        course_report = ReportRepository(request.user).get_course_report()
        return Response(asdict(course_report), status.HTTP_200_OK)
