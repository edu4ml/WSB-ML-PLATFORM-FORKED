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
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from allauth.urls import urlpatterns as allauth_urlpatterns
from frontend.urls import urlpatterns
from server.views import is_authenticated, profile

custom_allauth_urlpatterns = [
    path("authenticated/", is_authenticated, name="is_authenticated"),
    path("profile/", profile, name="profile"),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "auth/",
        include(([*allauth_urlpatterns, *custom_allauth_urlpatterns], "allauth")),
    ),
    path("", include((urlpatterns, "frontend"))),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
