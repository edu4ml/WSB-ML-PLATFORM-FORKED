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
from dj_rest_auth.urls import urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from course_tracker.services_application.urls import (
    urlpatterns as course_tracker_urlpatterns,
)
from frontend.urls import urlpatterns as frontend_urlpatterns
from server.views import is_authenticated


custom_auth_patterns = [path("is_authenticated/", is_authenticated)]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include(([*urlpatterns, *custom_auth_patterns], "auth"))),
    path("api/", include(course_tracker_urlpatterns)),
    path("", include((frontend_urlpatterns, "frontend"))),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
