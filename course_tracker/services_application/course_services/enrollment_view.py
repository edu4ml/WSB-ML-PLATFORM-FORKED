from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from course_tracker.models import Course, User
from course_tracker.services_domain.course_services.enrollment_service import (
    CourseEnrollmentService,
)


class CourseEnrollmentSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())


class CourseEnrollmentView(GenericViewSet):
    queryset = []
    serializer_class = CourseEnrollmentSerializer

    def create(self, request):
        user_id = request.POST.get("user_id")
        course_id = request.POST.get("course_id")

        service = CourseEnrollmentService()
        service.enroll_user(course_id=course_id, user_id=user_id)

        return Response(
            dict(
                success=True,
                message="User enrolled for the course",
                user_id=user_id,
                course_id=course_id,
            )
        )
