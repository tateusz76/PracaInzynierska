from rest_framework import serializers
from .models import *


class PacjentSerializer(serializers.HyperlinkedModelSerializer):
    szczepionka = serializers.SlugRelatedField(queryset=Szczepionka.objects.all(), slug_field='nazwaSzczepionki')

    class Meta:
        model = Pacjent
        fields = ['id', 'imie', 'nazwisko', 'pesel', 'telefon', 'szczepionka']


class SzczepionkaSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Szczepionka
        fields = ['id', 'nazwaSzczepionki']


class SzczepienieSerializer(serializers.HyperlinkedModelSerializer):
    pacjent = serializers.SlugRelatedField(queryset=Pacjent.objects.all(), slug_field='id')

    class Meta:
        model = Szczepienie
        fields = ['id', 'pacjent', 'dataSzczepienia', 'czyOstatniaDawka']

class ZaszczepionySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Zaszczepiony
        fields = ['id', 'imie', 'nazwisko', 'pesel', 'telefon', 'szczepionka']