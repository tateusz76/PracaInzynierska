# Generated by Django 4.0.3 on 2022-04-11 09:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Szczepienia', '0003_alter_szczepienie_idpacjenta'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Szczepienie',
        ),
    ]
