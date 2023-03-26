# Generated by Django 4.1.7 on 2023-03-24 12:30

from django.db import migrations, models
import shared.enums


class Migration(migrations.Migration):
    dependencies = [
        ("db", "0008_evaluation_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="evaluation",
            name="type",
            field=models.CharField(
                choices=[
                    ("COURSE_STEP_EVALUATION_TYPES", "_PREFIX"),
                    ("SELF_EVALUATED", "SELF_EVALUATED"),
                    ("FILE_EVALUATED", "FILE_EVALUATED"),
                    ("TEST_EVALUATED", "TEST_EVALUATED"),
                    ("TEACHER_EVALUATED", "TEACHER_EVALUATED"),
                ],
                default=shared.enums.CourseStepEvaluationTypes["TEACHER_EVALUATED"],
                max_length=40,
            ),
        ),
    ]