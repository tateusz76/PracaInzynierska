# Generated by Django 4.1.1 on 2022-10-26 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Szczepienia', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='punkt',
            name='miasto',
            field=models.TextField(max_length=80),
        ),
        migrations.AlterField(
            model_name='punkt',
            name='nazwa',
            field=models.TextField(max_length=80),
        ),
        migrations.AlterField(
            model_name='punkt',
            name='numer',
            field=models.TextField(max_length=80),
        ),
        migrations.AlterField(
            model_name='punkt',
            name='ulica',
            field=models.TextField(max_length=80),
        ),
    ]