from django.urls import path, include

from api.apis.v1.auth import GoogleLoginApi
from api.apis.v1.course import (
    CourseApi,
    CourseCommandApi,
    CourseDetailApi,
    CourseStepApi,
)
from api.apis.v1.exercise import ExerciseApi, ExerciseDetailApi 


urlpatterns_v1 = [
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

urlpatterns = [
    path("v1/", include((urlpatterns_v1, "v1")))
]