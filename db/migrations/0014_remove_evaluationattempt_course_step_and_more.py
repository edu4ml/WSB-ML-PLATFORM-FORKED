# Generated by Django 4.1.7 on 2023-03-24 13:19

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("db", "0013_remove_evaluationattempt_evaluation_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="evaluationattempt",
            name="course_step",
        ),
        migrations.AddField(
            model_name="evaluationattempt",
            name="course_step",
            field=models.ManyToManyField(default=None, null=True, to="db.coursestep"),
        ),
    ]
