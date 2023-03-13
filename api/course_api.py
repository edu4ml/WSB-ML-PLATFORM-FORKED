from dataclasses import asdict
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.apps import apps

from db.repository.course import CourseRepository
from elearning.apps import APP_NAME
from elearning.courses.commands import CreateCourse, EnrollForCourse, CompleteCourseStep
from infra.command_bus import CommandBus


class CourseApi(APIView):
    def get(self, request, format=None):
        courses = CourseRepository(request.user).list()
        serialized = [asdict(course) for course in courses]
        return Response(serialized, status.HTTP_200_OK)


class CourseDetailApi(APIView):
    def get(self, request, course_id, **kwargs):
        course = CourseRepository(request.user).retrieve(id=course_id)
        if course:
            return Response(asdict(course), status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)


class CourseCommandApi(APIView):
    def _prepare_command(self, request, course_id):
        match request.data.get("type"):
            case CreateCourse.Meta.name:
                return CreateCourse(
                    parent_id=course_id,
                    title=request.data.get("title"),
                    description=request.data.get("description"),
                )
            case EnrollForCourse.Meta.name:
                return EnrollForCourse(
                    parent_id=course_id, user_id=request.data.get("user_id")
                )
            case CompleteCourseStep.Meta.name:
                return CompleteCourseStep(
                    parent_id=course_id,
                    progress_tracking_id=request.data.get("progress_tracking_id"),
                )
            case _:
                raise NotImplementedError(f"I dont know this command: {request.data}")

    def put(self, request, course_id, **kwargs):
        command_bus: CommandBus = apps.get_app_config(APP_NAME).command_bus
        command_bus.issue(self._prepare_command(request, course_id))
        return Response(dict(), status.HTTP_202_ACCEPTED)
