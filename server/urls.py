"""django_react_oauth URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from dj_rest_auth.urls import urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from api.urls import urlpatterns as course_tracker_urlpatterns
from frontend.urls import urlpatterns as frontend_urlpatterns
from django.shortcuts import render


def home(request):
    return render(request, "frontend/google.html")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("dj_rest_auth.urls")),
    # path("oauth/", include('dj_rest_auth.registration.urls')),
    path("api/", include(course_tracker_urlpatterns)),
    path("api/accounts/", include("allauth.urls")),
    path("home/", home),
    path("", include((frontend_urlpatterns, "frontend"))),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
