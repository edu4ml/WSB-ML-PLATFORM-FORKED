from .settings import *


DATABASES["default"]["NAME"] = "test_" + DATABASES["default"]["NAME"]
