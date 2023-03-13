# Generated by Django 4.1.7 on 2023-03-04 23:47

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("course_tracker", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="course",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="course",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name="enrolment",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="enrolment",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
    ]