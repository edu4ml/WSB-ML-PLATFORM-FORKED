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


class CourseDetailView(APIView):
    def get(self, request, course_id, **kwargs):
        service = CourseCatalogService()
        course = service.retrieve(user=request.user, course_id=course_id)
        if course:
            return Response(course.dict(),status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)