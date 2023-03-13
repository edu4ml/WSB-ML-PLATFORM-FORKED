# Generated by Django 4.1.7 on 2023-03-08 18:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("course_tracker", "0017_rename_exercise_courseexercise_step_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="coursestep",
            name="type",
            field=models.CharField(
                choices=[
                    ("TEST", "Test"),
                    ("EXERCISE", "Exercise"),
                    ("EXTERNAL_RESOURCE", "External Resource"),
                    ("UNKNOWN", "Unknown step"),
                ],
                default="UNKNOWN",
                max_length=20,
            ),
        ),
    ]