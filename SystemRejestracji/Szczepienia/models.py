from datetime import datetime
from django.db import models

# Create your models here.

class Szczepionka(models.Model):
    nazwaSzczepionki = models.CharField(max_length=45, unique=True)

    def __str__(self):
        return self.nazwaSzczepionki

    class Meta:
        verbose_name_plural = "Szczepionki"


class Pacjent(models.Model):
    imie = models.CharField(max_length=45)
    nazwisko = models.CharField(max_length=45)
    pesel = models.CharField(max_length=11, unique=True)
    telefon = models.CharField(max_length=9, unique=True)
    szczepionka = models.ForeignKey(Szczepionka, related_name='szczepionki', on_delete=models.DO_NOTHING, default = '')

    def __str__(self):
        return self.imie + ' ' +  self.nazwisko

    class Meta:
        verbose_name_plural = "Pacjenci"


class Szczepienie(models.Model):
    pacjent = models.ForeignKey(Pacjent, related_name='szczepionyKto', on_delete=models.DO_NOTHING, default = 0)
    dataSzczepienia = models.DateField(default= datetime.now, blank=True)
    czyOstatniaDawka = models.BooleanField(default=False)

    def __str__(self):
        return str(self.pacjent) + ' ' + str(self.dataSzczepienia)

    class Meta:
        verbose_name_plural = "Szczepienia"