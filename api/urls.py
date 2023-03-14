from django.urls import path

from .exercise_api import ExerciseApi, ExerciseDetailApi
from .course_api import CourseDetailApi, CourseApi, CourseCommandApi

urlpatterns = [
    path("course/", CourseApi.as_view(), name="course"),
    path(
        "course/<int:course_id>",
        CourseDetailApi.as_view(),
        name="course-detail",
    ),
    path(
        "course/<int:course_id>/command",
        CourseCommandApi.as_view(),
        name="course-command",
    ),
    path("exercise/", ExerciseApi.as_view(), name="exercise"),
    path(
        "exercise/<int:exercise_id>",
        ExerciseDetailApi.as_view(),
        name="exercise-detail",
    ),
]
