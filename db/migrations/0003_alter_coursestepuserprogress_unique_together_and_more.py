# Generated by Django 4.1.7 on 2023-04-02 11:01

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("db", "0002_alter_coursestepuserprogress_unique_together_and_more"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="coursestepuserprogress",
            unique_together={("user", "step")},
        ),
        migrations.RemoveField(
            model_name="coursestepuserprogress",
            name="course",
        ),
    ]
