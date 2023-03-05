from django.urls import path

from course_tracker.services_application.course_services.course_view import CourseView
from course_tracker.services_application.course_services.enrollment_view import (
    CourseEnrollmentView,
)


urlpatterns = [
    path("course-catalog/", CourseView.as_view(), name="course-catalog"),
    path("enroll-course/", CourseEnrollmentView.as_view(), name="enroll-course"),
]
