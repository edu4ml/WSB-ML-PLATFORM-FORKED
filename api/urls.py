from django.urls import path
from .course_api import CoursesCatalogApi

urlpatterns = [
    path("course/", CoursesCatalogApi.as_view(), name="course"),
    # path(
    #     "course-catalog/<int:course_id>",
    #     CourseDetailView.as_view(),
    #     name="course-detail",
    # ),
    # path("enroll-course/", CourseEnrollmentView.as_view(), name="enroll-course"),
]
