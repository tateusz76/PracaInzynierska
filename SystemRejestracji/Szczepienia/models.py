from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

# Create your models here.


class Szczepionka(models.Model):
    nazwaSzczepionki = models.CharField(max_length=45, unique=True)
    dawka = models.IntegerField()

    def __str__(self):
        return self.nazwaSzczepionki

    class Meta:
        verbose_name_plural = "Szczepionki"


class Pacjent(AbstractUser):
    email = models.EmailField(max_length=45, unique=True)
    is_staff = models.BooleanField(default=False)
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'is_staff']
    USERNAME_FIELD = 'email'

    def get_username(self):
        return self.email

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    class Meta:
        verbose_name_plural = "Pacjenci"


class Punkt(models.Model):
    nazwa = models.TextField(max_length=80)
    miasto = models.TextField(max_length=80)
    ulica = models.TextField(max_length=80)
    numer = models.TextField(max_length=80)
    centerX = models.FloatField(null=True)
    centerY = models.FloatField(null=True)

    def __str__(self):
        return str(self.nazwa) + ' ' + str(self.miasto) + ' ' + str(self.ulica) + ' ' + str(self.numer)

    class Meta:
        verbose_name_plural = "Punkty szczepień"


class Pracownik(models.Model):
    #pracownik = models.OneToOneField(Pacjent, on_delete=models.DO_NOTHING)
    pracownik = models.ForeignKey(Pacjent, related_name='ktoPracuje', on_delete=models.DO_NOTHING, default=0)
    punkt = models.ForeignKey(Punkt, related_name='gdziePracuje', on_delete=models.DO_NOTHING, default=0)

    def __str__(self):
        return str(self.pracownik.first_name) + ' ' + str(self.pracownik.last_name)

    class Meta:
        verbose_name_plural = "Pracownicy punktów"


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


