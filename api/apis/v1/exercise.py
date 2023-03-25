from dataclasses import asdict

from rest_framework import status
from rest_framework.response import Response

from api.apis.mixins import AuthMixin


class ExerciseApi(AuthMixin):
    def get(self, request, format=None):
        # exercises = ExerciseRepository(request.user).list()
        exercises = []
        serialized = [asdict(e) for e in exercises]
        return Response(serialized, status.HTTP_200_OK)


class ExerciseDetailApi(AuthMixin):
    def get(self, request, exercise_uuid, **kwargs):
        # course = ExerciseRepository(request.user).retrieve(uuid=exercise_uuid)
        exercise = None
        if exercise:
            return Response(asdict(exercise), status.HTTP_200_OK)
        return Response(dict(), status.HTTP_404_NOT_FOUND)
