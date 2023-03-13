# Generated by Django 4.1.7 on 2023-03-08 18:11

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("course_tracker", "0016_rename_exercise_coursestep"),
    ]

    operations = [
        migrations.RenameField(
            model_name="courseexercise",
            old_name="exercise",
            new_name="step",
        ),
        migrations.AlterUniqueTogether(
            name="courseexercise",
            unique_together={("course", "order"), ("course", "step")},
        ),
    ]