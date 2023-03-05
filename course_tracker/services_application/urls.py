from django.urls import path
from rest_framework import routers

from course_tracker.services_application.course_services.course_view import CourseView
from course_tracker.services_application.course_services.enrollment_view import (
    CourseEnrollmentView,
)


router = routers.DefaultRouter()
# router.register(r'enroll-course', CourseEnrollmentView, basename="enroll-course")
# router.register(r'course-catalog', CourseView, basename="course-catalog")

urlpatterns = [path("course-catalog/", CourseView.as_view(), name="course-catalog")]
