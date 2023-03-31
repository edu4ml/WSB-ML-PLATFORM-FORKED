from .settings import *


DATABASES["default"]["NAME"] = "test_" + DATABASES["default"]["NAME"]

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": ":memory:",
#     }
# }
