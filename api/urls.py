from django.urls import path

from api.apis.v1.auth import GoogleLoginApi

from .api_course import (
    CourseApi,
    CourseCommandApi,
    CourseDetailApi,
    CourseStepApi,
)
from .api_exercise import ExerciseApi, ExerciseDetailApi


urlpatterns = [
    path("course/", CourseApi.as_view(), name="course"),
    path("course-components/", CourseStepApi.as_view(), name="course-components"),
    path(
        "course/<uuid:course_uuid>",
        CourseDetailApi.as_view(),
        name="course-detail",
    ),
    path(
        "course/<uuid:course_uuid>/command",
        CourseCommandApi.as_view(),
        name="course-command",
    ),
    path("exercise/", ExerciseApi.as_view(), name="exercise"),
    path(
        "exercise/<uuid:exercise_uuid>",
        ExerciseDetailApi.as_view(),
        name="exercise-detail",
    ),
    path("auth/login/google/", GoogleLoginApi.as_view(), name="login-with-google"),
]
