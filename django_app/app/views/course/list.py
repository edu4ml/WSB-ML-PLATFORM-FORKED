from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from elearning.courses.service import CourseService


class CoursesCatalogApi(APIView):
    def get(self, request, format=None):
        courses = CourseService.list()
        serialized = [course.dict() for course in courses]
        return Response(serialized, status.HTTP_200_OK)


# class CourseDetailView(APIView):
#     def get(self, request, course_id, **kwargs):
#         service = CourseCatalogService()
#         course = service.retrieve(user=request.user, course_id=course_id)
#         if course:
#             return Response(course.dict(), status.HTTP_200_OK)
#         return Response(dict(), status.HTTP_404_NOT_FOUND)
