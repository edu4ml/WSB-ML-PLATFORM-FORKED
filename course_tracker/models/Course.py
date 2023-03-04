from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    students = models.ManyToManyField(User, through='Enrolment')

    def __str__(self):
        return self.title