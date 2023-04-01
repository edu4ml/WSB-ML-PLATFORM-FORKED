from urllib.parse import urlencode

import requests
from dj_rest_auth.app_settings import api_settings
from dj_rest_auth.jwt_auth import set_jwt_cookies
from dj_rest_auth.models import get_token_model
from dj_rest_auth.utils import jwt_encode
from dj_rest_auth.views import LoginView
from django.conf import settings
from django.core.exceptions import ValidationError
from django.shortcuts import redirect
from rest_framework import serializers

from db.repository.user import UserRepository


def google_get_access_token(*, code: str, redirect_uri: str) -> str:
    # Reference: https://developers.google.com/identity/protocols/oauth2/web-server#obtainingaccesstokens
    data = {
        "code": code,
        "client_id": settings.GOOGLE_OAUTH2_CLIENT_ID,
        "client_secret": settings.GOOGLE_OAUTH2_CLIENT_SECRET,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
    }

    response = requests.post(settings.GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)

    if not response.ok:
        raise ValidationError("Failed to obtain access token from Google.")

    return response.json()["access_token"]


def google_get_user_info(*, access_token: str):
    # Reference: https://developers.google.com/identity/protocols/oauth2/web-server#callinganapi
    response = requests.get(
        settings.GOOGLE_USER_INFO_URL, params={"access_token": access_token}
    )

    if not response.ok:
        raise ValidationError("Failed to obtain user info from Google.")

    return response.json()


class GoogleLoginApi(LoginView):
    permission_classes = ()
    authentication_classes = ()

    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        user_repository = UserRepository()

        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get("code")
        error = validated_data.get("error")

        if error or not code:
            params = urlencode({"error": error})
            return redirect(f"{settings.PLATFORM_URL}?{params}")

        # api_uri = reverse('api:v1:auth:login-with-google')
        api_uri = f"{settings.PLATFORM_URL}/api/v1/auth/login/google"

        access_token = google_get_access_token(code=code, redirect_uri=api_uri)
        user_data = google_get_user_info(access_token=access_token)

        profile_data = {
            "username": user_data["email"],
            "first_name": user_data.get("givenName", ""),
            "last_name": user_data.get("familyName", ""),
        }
        # We use get-or-create logic here for the sake of the example.
        # We don't have a sign-up flow.
        self.user = user_repository.get_or_create(
            email=user_data["email"], **profile_data
        )

        token_model = get_token_model()

        if api_settings.USE_JWT:
            self.access_token, self.refresh_token = jwt_encode(self.user)
        elif token_model:
            self.token = api_settings.TOKEN_CREATOR(
                token_model, self.user, self.serializer
            )

        if api_settings.SESSION_LOGIN:
            self.process_login()

        response = redirect(f"{settings.PLATFORM_URL}/courses")
        set_jwt_cookies(response, self.access_token, self.refresh_token)
        return response
