# Generated by Django 4.1.7 on 2023-03-08 18:15

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("course_tracker", "0018_coursestep_type"),
    ]

    operations = [
        migrations.RenameField(
            model_name="resource",
            old_name="description",
            new_name="title",
        ),
    ]
