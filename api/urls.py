from django.urls import path, include

from api.apis.v1.auth.auth import GoogleLoginApi
from api.apis.v1.commands.commands import CommandsApi
from api.apis.v1.course.course import (
    CourseApi,
    CourseDetailApi,
)
from dj_rest_auth.urls import urlpatterns as auth_urlpatterns
from api.apis.v1.course.course_step import (
    CourseStepApi,
    CourseStepDetailApi,
    CourseStepDetailSubmissionsApi,
    CourseStepUserProgressDetailsApi,
    CourseStepUserProgressSubmissionUploadApi,
)
from api.apis.v1.course_components.course_components import (
    CourseComponentApi,
    CourseComponentDetailApi,
    CourseComponentDetailFileUploadApi,
    CourseComponentDetailFileDetailApi,
)
from api.apis.v1.submission.submission import (
    SubmissionApi,
    SubmissionDetailApi,
)

from api.apis.v1.reports.report import DashboardApi

urlpatterns_v1 = [
    path("components/", CourseComponentApi.as_view(), name="component-list"),
    path(
        "components/<uuid:component_uuid>",
        CourseComponentDetailApi.as_view(),
        name="component-detail",
    ),
    path(
        "components/<uuid:component_uuid>/file-resources",
        CourseComponentDetailFileUploadApi.as_view(),
        name="component-detail-file-resources",
    ),
    path(
        "components/<uuid:component_uuid>/file-resources/<uuid:resource_uuid>",
        CourseComponentDetailFileDetailApi.as_view(),
        name="component-detail-file-resources-detail",
    ),
    path("courses/", CourseApi.as_view(), name="course-list"),
    path(
        "courses/<uuid:course_uuid>",
        CourseDetailApi.as_view(),
        name="course-detail",
    ),
    path(
        "courses/<uuid:course_uuid>/step",
        CourseStepApi.as_view(),
        name="course-detail-steps",
    ),
    path(
        "course/<uuid:course_uuid>/step/<uuid:step_uuid>",
        CourseStepDetailApi.as_view(),
        name="course-detail-steps-detail",
    ),
    path(
        "course/<uuid:course_uuid>/step/<uuid:step_uuid>/submissions",
        CourseStepDetailSubmissionsApi.as_view(),
        name="course-detail-steps-detail-submissions",
    ),
    path(
        "course/<uuid:course_uuid>/step/<uuid:step_uuid>/user-progress/<uuid:user_progress_uuid>",
        CourseStepUserProgressDetailsApi.as_view(),
        name="course-detail-steps-detail-user-progress",
    ),
    path(
        "course/<uuid:course_uuid>/step/<uuid:step_uuid>/user/<uuid:user_uuid>",
        CourseStepUserProgressSubmissionUploadApi.as_view(),
        name="course-steps-user-progress",
    ),
    path("report/teacher/", DashboardApi.as_view(), name="teacher-report"),
    path("auth/login/google/", GoogleLoginApi.as_view(), name="login-with-google"),
    path("auth/", include((auth_urlpatterns, "auth"))),
    path("submission/", SubmissionApi.as_view(), name="submission"),
    path(
        "submission/<uuid:submission_uuid>",
        SubmissionDetailApi.as_view(),
        name="submission-detail",
    ),
    path("commands/", CommandsApi.as_view(), name="command-list"),
]

urlpatterns = [path("v1/", include((urlpatterns_v1, "v1")))]
