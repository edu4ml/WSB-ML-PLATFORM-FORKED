from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.views import LoginView


from urllib.parse import urlencode
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from dj_rest_auth.app_settings import api_settings
from dj_rest_auth.models import get_token_model
from dj_rest_auth.utils import jwt_encode
from dj_rest_auth.jwt_auth import set_jwt_cookies

from django.urls import reverse
from django.conf import settings
from django.shortcuts import redirect
from db.models import CustomUser

from .services import google_get_access_token, google_get_user_info, jwt_login, user_get_or_create


class GoogleLoginApi(LoginView):
    permission_classes = ()
    authentication_classes = ()
    
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error')

        login_url = 'http://127.0.0.1:8000/auth/login'

        if error or not code:
            params = urlencode({'error': error})
            return redirect(f'{login_url}?{params}')

        # domain = 'http://127.0.0.1:8000/'
        # api_uri = reverse('api:v1:auth:login-with-google')
        api_uri = 'http://127.0.0.1:8000/api/auth/login/google'
        redirect_uri = api_uri

        access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)

        user_data = google_get_user_info(access_token=access_token)

        profile_data = {
            'email': user_data['email'],
            'username': f"{user_data.get('givenName', user_data['email'])}",
            'first_name': user_data.get('givenName', ''),
            'last_name': user_data.get('familyName', ''),
        }

        # We use get-or-create logic here for the sake of the example.
        # We don't have a sign-up flow.
        user, _ = user_get_or_create(**profile_data)

        self.user = user

        token_model = get_token_model()

        if api_settings.USE_JWT:
            self.access_token, self.refresh_token = jwt_encode(self.user)
        elif token_model:
            self.token = api_settings.TOKEN_CREATOR(token_model, self.user, self.serializer)

        if api_settings.SESSION_LOGIN:
            self.process_login()

        response = redirect('http://127.0.0.1:8000/courses')
        set_jwt_cookies(response, self.access_token, self.refresh_token)
        return response