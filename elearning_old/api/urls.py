from django.urls import path

from course_tracker.api.course_services.course_catalog import (
    CourseDetailView,
    CoursesCatalogApi,
)
from course_tracker.api.course_services.enrollment_view import (
    CourseEnrollmentView,
)


urlpatterns = [
    path("course-catalog/", CoursesCatalogApi.as_view(), name="course-catalog"),
    path(
        "course-catalog/<int:course_id>",
        CourseDetailView.as_view(),
        name="course-detail",
    ),
    path("enroll-course/", CourseEnrollmentView.as_view(), name="enroll-course"),
]
