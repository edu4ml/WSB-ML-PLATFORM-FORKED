from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.core import serializers


def is_authenticated(request):
    return JsonResponse(dict(isAuthenticated=request.user.is_authenticated))


@login_required
def profile(request):
    user_data: dict = serializers.serialize("python", [request.user])[0]["fields"]
    user_data.pop("password")
    return JsonResponse(user_data)
