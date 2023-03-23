import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from db.models.mixin import TimestampedModel
from shared.enums import UserRoles


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

    def is_teacher(self):
        return UserRoles.TEACHER in self.roles.all().values_list("name", flat=True)
    
    def is_student(self):
        return UserRoles.STUDENT in self.roles.all().values_list("name", flat=True)
    
    