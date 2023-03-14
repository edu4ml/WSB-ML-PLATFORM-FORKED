from dataclasses import asdict
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.apps import apps

from db.repository.exercise import ExerciseRepository
from elearning.apps import APP_NAME
from elearning.courses.commands import CreateCourse, EnrollForCourse, CompleteCourseStep
from infra.command_bus import CommandBus


class ExerciseApi(APIView):
    def get(self, request, format=None):
        exercises = ExerciseRepository(request.user).list()
        serialized = [asdict(e) for e in exercises]
        return Response(serialized, status.HTTP_200_OK)


class ExerciseDetailApi(APIView):
    def get(self, request, exercise_id, **kwargs):
        course = ExerciseRepository(request.user).retrieve(id=exercise_id)
        if course:
            return Response(asdict(course), status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)
