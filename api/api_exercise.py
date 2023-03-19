from dataclasses import asdict

from rest_framework import status
from rest_framework.response import Response
from api.api_mixin import AuthMixin

from db.repository.exercise import ExerciseRepository


class ExerciseApi(AuthMixin):
    def get(self, request, format=None):
        exercises = ExerciseRepository(request.user).list()
        serialized = [asdict(e) for e in exercises]
        return Response(serialized, status.HTTP_200_OK)


class ExerciseDetailApi(AuthMixin):
    def get(self, request, exercise_uuid, **kwargs):
        course = ExerciseRepository(request.user).retrieve(uuid=exercise_uuid)
        if course:
            return Response(asdict(course), status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)