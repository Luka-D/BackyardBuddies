# Generated by Django 4.1.3 on 2023-01-16 20:48

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="house",
            name="slug",
            field=models.SlugField(
                default="djangodbmodelsfieldscharfield", unique=True
            ),
        ),
        migrations.AlterField(
            model_name="house",
            name="residents",
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]