from dataclasses import asdict
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from db.repository.course import CourseRepository


class CoursesCatalogApi(APIView):
    def get(self, request, format=None):
        courses = CourseRepository().list()
        serialized = [asdict(course) for course in courses]
        return Response(serialized, status.HTTP_200_OK)
