from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from course_tracker.services_domain.course_services.catalog_service import (
    CourseCatalogService,
)


class CourseView(APIView):
    def get(self, request, format=None):
        service = CourseCatalogService()
        courses = service.list(user=request.user)
        serialized = [course.dict() for course in courses]
        return Response(serialized, status.HTTP_200_OK)
