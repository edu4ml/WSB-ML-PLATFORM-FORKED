from django.urls import path

from .exercise_api import ExerciseApi, ExerciseDetailApi
from .course_api import CourseDetailApi, CourseApi, CourseCommandApi, CourseStepApi

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
