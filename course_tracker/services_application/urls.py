from django.urls import path

from course_tracker.services_application.course_services.course_view import CourseDetailView, CourseView
from course_tracker.services_application.course_services.enrollment_view import (
    CourseEnrollmentView,
)


urlpatterns = [
    path("course-catalog/", CourseView.as_view(), name="course-catalog"),
    path("course-catalog/<int:course_id>", CourseDetailView.as_view(), name="course-detail"),
    path("enroll-course/", CourseEnrollmentView.as_view(), name="enroll-course"),
]
