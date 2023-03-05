# Generated by Django 4.1.7 on 2023-03-05 00:30

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        (
            "course_tracker",
            "0005_answer_question_quiz_remove_exercise_file_solution_and_more",
        ),
    ]

    operations = [
        migrations.CreateModel(
            name="ExerciseCompletion",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("completed_at", models.DateTimeField(auto_now_add=True)),
                ("is_file_passed", models.BooleanField(default=False)),
                ("is_test_passed", models.BooleanField(default=False)),
                ("is_reviewed", models.BooleanField(default=False)),
                ("is_self_evaluated", models.BooleanField(default=False)),
                (
                    "attempts",
                    models.ManyToManyField(to="course_tracker.exerciseattempt"),
                ),
                (
                    "exercise",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="course_tracker.exercise",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]