# Generated by Django 4.1.3 on 2023-01-16 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_house_slug_alter_house_residents"),
    ]

    operations = [
        migrations.AlterField(
            model_name="house",
            name="slug",
            field=models.SlugField(default="djangodbmodelsfieldscharfield"),
        ),
    ]