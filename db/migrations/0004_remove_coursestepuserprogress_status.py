# Generated by Django 4.1.7 on 2023-04-02 12:01

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("db", "0003_alter_coursestepuserprogress_unique_together_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="coursestepuserprogress",
            name="status",
        ),
    ]
