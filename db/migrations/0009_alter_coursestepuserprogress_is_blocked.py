# Generated by Django 4.1.7 on 2023-04-05 20:40

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("db", "0008_coursestepuserprogress_is_blocked"),
    ]

    operations = [
        migrations.AlterField(
            model_name="coursestepuserprogress",
            name="is_blocked",
            field=models.BooleanField(default=True),
        ),
    ]