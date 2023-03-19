from dataclasses import asdict
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.apps import apps

from db.repository.exercise import ExerciseRepository
from db.repository.evaluation import EvaluationRepository
from db.repository.course import CourseRepository
from elearning.apps import APP_NAME
from elearning.coursing.commands import (
    CreateCourse,
    EnrollForCourse,
    CompleteCourseStep,
    UpdateCourse,
)
from infra.command_bus import CommandBus
from shared.enums import CommandTypes
from uuid import UUID


class CourseApi(APIView):
    def get(self, request, format=None):
        courses = CourseRepository(request.user).list()
        serialized = [asdict(course) for course in courses]
        return Response(serialized, status.HTTP_200_OK)

    def _prepare_command(self, request, format=None):
        match request.data.get("type"):
            case CreateCourse.Meta.name:
                return CreateCourse(
                    title=request.data.get("title"),
                    description=request.data.get("description", ""),
                )
            case _:
                raise NotImplementedError(
                    f"I dont know this command: {request.data}."
                    " Only initial commands allowed at this endpoint"
                )

    def put(self, request, **kwargs):
        try:
            command_bus: CommandBus = apps.get_app_config(APP_NAME).command_bus
            course = command_bus.issue(self._prepare_command(request))
            return Response(asdict(course), status.HTTP_201_CREATED)
        except NotImplementedError as e:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message="NotImplemented",
                ),
                status.HTTP_501_NOT_IMPLEMENTED,
            )


class CourseDetailApi(APIView):
    def get(self, request, course_id: UUID, **kwargs):
        course = CourseRepository(request.user).retrieve(id=course_id)
        if course:
            return Response(asdict(course), status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)


class CourseCommandApi(APIView):
    def _prepare_command(self, request, course_id):
        match request.data.get("type"):
            case CommandTypes.ENROLL_FOR_COURSE:
                return EnrollForCourse(
                    parent_id=course_id, user_id=request.data.get("user_id")
                )
            case CommandTypes.COMPLETE_COURSE_STEP:
                return CompleteCourseStep(
                    parent_id=course_id,
                    progress_tracking_id=request.data.get("progress_tracking_id"),
                )
            case CommandTypes.UPDATE_COURSE:
                return UpdateCourse(
                    parent_id=course_id,
                    title=request.data.get("title"),
                    description=request.data.get("description"),
                    is_draft=request.data.get("is_draft"),
                    steps=request.data.get("steps"),
                )
            case _:
                raise NotImplementedError(f"I dont know this command: {request.data}")

    def put(self, request, course_id: UUID, **kwargs):
        try:
            command_bus: CommandBus = apps.get_app_config(APP_NAME).command_bus
            command_bus.issue(self._prepare_command(request, course_id))
            return Response(dict(), status.HTTP_202_ACCEPTED)
        except NotImplementedError as e:
            return Response(
                dict(
                    error=True,
                    success=False,
                    payload=request.data,
                    message="NotImplemented",
                ),
                status.HTTP_501_NOT_IMPLEMENTED,
            )


class CourseStepApi(APIView):
    def get(self, request, **kwargs):
        exercises = ExerciseRepository(request.user).list()
        evaluations = EvaluationRepository(request.user).list()

        serialized = [asdict(i) for i in [*exercises, *evaluations]]
        return Response(serialized, status=status.HTTP_200_OK)
