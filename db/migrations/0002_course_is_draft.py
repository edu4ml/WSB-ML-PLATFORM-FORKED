# Generated by Django 4.1.7 on 2023-03-13 12:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("db", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="course",
            name="is_draft",
            field=models.BooleanField(default=True),
        ),
    ]