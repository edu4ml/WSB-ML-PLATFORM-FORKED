from django.urls import path, include

from api.apis.v1.auth import GoogleLoginApi
from api.apis.v1.course import (
    CourseApi,
    CourseCommandApi,
    CourseComponentDetailApi,
    CourseDetailApi,
    CourseComponentApi,
)
from api.apis.v1.exercise import ExerciseApi, ExerciseDetailApi
from dj_rest_auth.urls import urlpatterns as auth_urlpatterns

from api.apis.v1.reports.tacher import TeacherReport


urlpatterns_v1 = [
    path("course/", CourseApi.as_view(), name="course"),
    path("course-components/", CourseComponentApi.as_view(), name="course-components"),
    path(
        "course-components/<uuid:component_uuid>",
        CourseComponentDetailApi.as_view(),
        name="course-components-detail",
    ),
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
    path("report/teacher/", TeacherReport.as_view(), name="teacher-report"),
    path("auth/login/google/", GoogleLoginApi.as_view(), name="login-with-google"),
    path("auth/", include((auth_urlpatterns, "auth"))),
]

urlpatterns = [path("v1/", include((urlpatterns_v1, "v1")))]
