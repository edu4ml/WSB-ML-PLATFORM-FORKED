from django.contrib.auth import authenticate, login, views
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


def is_authenticated(request):
    return JsonResponse(dict(isAuthenticated=request.user.is_authenticated))


@login_required
def profile(request):
    return JsonResponse(_serialize_user(request.user))


def _serialize_user(user) -> dict:
    user_data: dict = serializers.serialize("python", [user])[0]["fields"]
    user_data.pop("password")
    return user_data
