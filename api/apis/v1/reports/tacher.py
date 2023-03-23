from rest_framework import status
from rest_framework.response import Response
from dataclasses import asdict
from api.apis.mixins import AuthMixin
from db.repository.report import ReportRepository

from infra.permissions import api_has_one_of_the_roles
from shared.enums import UserRoles


class TeacherReport(AuthMixin):
    @api_has_one_of_the_roles([UserRoles.TEACHER])
    def get(self, request, format=None):
        teacher_report = ReportRepository(request.user).get_for_teacher()
        return Response(asdict(teacher_report), status.HTTP_200_OK)
