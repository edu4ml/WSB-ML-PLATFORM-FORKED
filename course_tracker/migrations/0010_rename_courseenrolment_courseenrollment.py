# Generated by Django 4.1.7 on 2023-03-05 11:26

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("course_tracker", "0009_rename_student_courseenrolment_user"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="CourseEnrolment",
            new_name="CourseEnrollment",
        ),
    ]