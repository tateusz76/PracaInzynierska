from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Szczepionka(models.Model):
    nazwaSzczepionki = models.CharField(max_length=45, unique=True)

    def __str__(self):
        return self.nazwaSzczepionki

    class Meta:
        verbose_name_plural = "Szczepionki"


class Zaszczepiony(models.Model):
    imie = models.CharField(max_length=45)
    nazwisko = models.CharField(max_length=45)
    pesel = models.CharField(max_length=11, unique=True)

    def __str__(self):
        return self.imie + ' ' + self.nazwisko

    class Meta:
        verbose_name_plural = "Zaszczepieni"


class Pacjent(AbstractUser):
    email = models.EmailField(max_length=45, unique=True)
    pesel = models.TextField(max_length=11, unique=True)
    is_staff = models.BooleanField(default=False)
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'pesel', 'is_staff']
    USERNAME_FIELD = 'email'

    def get_username(self):
        return self.email

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    # def delete(self, *args, **kwargs):
    #     Zaszczepiony.objects.create(imie=self.first_name, nazwisko=self.last_name, pesel = self.pesel)
    #     super().delete(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Pacjenci"


class Punkt(models.Model):
    nazwa = models.TextField(max_length=80, unique=True)
    miasto = models.TextField(max_length=80, unique=True)
    ulica = models.TextField(max_length=80, unique=True)
    numer = models.TextField(max_length=80, unique=True)

    def __str__(self):
        return str(self.nazwa) + ' ' + str(self.miasto) + ' ' + str(self.ulica) + ' ' + str(self.numer)

    class Meta:
        verbose_name_plural = "Punkty szczepień"


class Szczepienie(models.Model):
    pacjent = models.ForeignKey(Pacjent, related_name='szczepionyKto', on_delete=models.DO_NOTHING, default = 0)
    dataSzczepienia = models.DateField()
    szczepionka = models.ForeignKey(Szczepionka, related_name='szczepionki', on_delete=models.DO_NOTHING, default='')
    punkt = models.ForeignKey(Punkt, related_name='punkty', on_delete=models.DO_NOTHING, default='')
    czyOstatniaDawka = models.BooleanField(default=False)

    def __str__(self):
        return str(self.pacjent) + ' ' + str(self.dataSzczepienia)

    class Meta:
        verbose_name_plural = "Szczepienia"


