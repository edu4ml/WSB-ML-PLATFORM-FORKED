# Generated by Django 4.1.7 on 2023-03-05 15:02

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("course_tracker", "0012_alter_courseexercise_unique_together"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="courseexercise",
            unique_together={("course", "order"), ("course", "exercise")},
        ),
    ]
