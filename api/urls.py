from django.urls import path, include

from api.apis.v1.auth.auth import GoogleLoginApi
from api.apis.v1.course.command import CourseCommandApi
from api.apis.v1.course.course import (
    CourseApi,
    CourseDetailApi,
)
from dj_rest_auth.urls import urlpatterns as auth_urlpatterns
from api.apis.v1.course_components.course_components import (
    CourseComponentApi,
    CourseComponentDetailApi,
)

from api.apis.v1.reports.teacher import TeacherReport
from api.apis.v1.resources.resource import (
    ExternalResourceApi,
    ExternalResourceDetailApi,
)


urlpatterns_v1 = [
    path("course/", CourseApi.as_view(), name="course"),
    path("course-components/", CourseComponentApi.as_view(), name="course-components"),
    path("resource/", ExternalResourceApi.as_view(), name="external-resource"),
    path(
        "resource/<uuid:resource_uuid>",
        ExternalResourceDetailApi.as_view(),
        name="external-resource-detail",
    ),
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
    path("report/teacher/", TeacherReport.as_view(), name="teacher-report"),
    path("auth/login/google/", GoogleLoginApi.as_view(), name="login-with-google"),
    path("auth/", include((auth_urlpatterns, "auth"))),
]

urlpatterns = [path("v1/", include((urlpatterns_v1, "v1")))]
