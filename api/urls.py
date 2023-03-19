from django.urls import path

from .course_api import (
    CourseApi,
    CourseCommandApi,
    CourseDetailApi,
    CourseStepApi,
)
from .exercise_api import ExerciseApi, ExerciseDetailApi


urlpatterns = [
    path("course/", CourseApi.as_view(), name="course"),
    path("course-components/", CourseStepApi.as_view(), name="course-components"),
    path(
        "course/<uuid:course_id>",
        CourseDetailApi.as_view(),
        name="course-detail",
    ),
    path(
        "course/<uuid:course_id>/command",
        CourseCommandApi.as_view(),
        name="course-command",
    ),
    path("exercise/", ExerciseApi.as_view(), name="exercise"),
    path(
        "exercise/<uuid:exercise_id>",
        ExerciseDetailApi.as_view(),
        name="exercise-detail",
    ),
]
