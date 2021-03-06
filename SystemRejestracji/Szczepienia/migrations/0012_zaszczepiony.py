# Generated by Django 4.0.3 on 2022-04-25 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Szczepienia', '0011_rename_pacjent_szczepienie_pacjent'),
    ]

    operations = [
        migrations.CreateModel(
            name='Zaszczepiony',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imie', models.CharField(max_length=45)),
                ('nazwisko', models.CharField(max_length=45)),
                ('pesel', models.CharField(max_length=11, unique=True)),
                ('telefon', models.CharField(max_length=9, unique=True)),
                ('szczepionka', models.CharField(max_length=45)),
            ],
        ),
    ]
