# Generated by Django 4.1.3 on 2023-01-10 20:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("map", "0007_alter_post_address"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="post",
            name="address",
        ),
    ]
