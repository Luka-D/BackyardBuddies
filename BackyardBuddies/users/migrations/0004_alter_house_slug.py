# Generated by Django 4.1.3 on 2023-01-16 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0003_alter_house_slug"),
    ]

    operations = [
        migrations.AlterField(
            model_name="house",
            name="slug",
            field=models.SlugField(),
        ),
    ]