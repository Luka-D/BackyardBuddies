# Generated by Django 4.1.3 on 2022-12-27 22:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
        ("map", "0006_rename_location_post_address"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="address",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="users.house"
            ),
        ),
    ]
