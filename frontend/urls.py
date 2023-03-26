from django.urls import re_path, path

from frontend.views import index


urlpatterns = [
    # re_path(r"^(?!api)", index),
    path("", index),
]
