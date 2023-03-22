import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from db.models.mixin import TimestampedModel


class Role(TimestampedModel):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class CustomUser(AbstractUser):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    roles = models.ManyToManyField(Role, blank=True)

    def __str__(self) -> str:
        return self.get_username() + " | " + self.email
