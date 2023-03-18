# Generated by Django 4.1.7 on 2023-03-15 18:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
        ("db", "0012_alter_coursestep_step_content_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="coursestep",
            name="step_content_type",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="contenttypes.contenttype",
            ),
        ),
        migrations.AlterField(
            model_name="coursestep",
            name="step_object_id",
            field=models.PositiveIntegerField(blank=True, default=None, null=True),
        ),
    ]