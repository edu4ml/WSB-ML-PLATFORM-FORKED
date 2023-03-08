# Generated by Django 4.1.7 on 2023-03-08 18:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("course_tracker", "0021_courseitem_rename_coursestep_learningstep_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="CourseStep",
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
                ("order", models.PositiveIntegerField()),
            ],
            options={
                "ordering": ["order"],
            },
        ),
        migrations.RenameModel(
            old_name="LearningStep",
            new_name="CourseComponent",
        ),
        migrations.DeleteModel(
            name="CourseItem",
        ),
        migrations.AddField(
            model_name="coursestep",
            name="component",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="course_tracker.coursecomponent",
            ),
        ),
        migrations.AddField(
            model_name="coursestep",
            name="course",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="course_tracker.course"
            ),
        ),
        migrations.AlterUniqueTogether(
            name="coursestep",
            unique_together={("course", "component"), ("course", "order")},
        ),
    ]
