from rest_framework import serializers
from .models import *


class PacjentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pacjent
        fields = '__all__'


class PatientEditProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pacjent
        fields = (
            'username',

        )
        extra_kwargs = {
            'username': {'required': False},
        }


class SzczepionkaSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Szczepionka
        fields = ['id', 'nazwaSzczepionki']


class SzczepienieSerializer(serializers.HyperlinkedModelSerializer):
    pacjent = serializers.SlugRelatedField(queryset=Pacjent.objects.all(), slug_field='username')
    szczepionka = serializers.SlugRelatedField(queryset=Szczepionka.objects.all(), slug_field='nazwaSzczepionki')
    punkt = serializers.SlugRelatedField(queryset=Punkt.objects.all(), slug_field='nazwa')


    class Meta:
        model = Szczepienie
        fields = ['id', 'pacjent', 'dataSzczepienia', 'szczepionka', 'punkt', 'czyOstatniaDawka']


# class ZaszczepionySerializer(serializers.HyperlinkedModelSerializer):
#
#     class Meta:
#         model = Zaszczepiony
#         fields = ['id', 'imie', 'nazwisko', 'pesel', 'telefon', 'szczepionka']


class PunktSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Punkt
        fields = ['id', 'nazwa', 'miasto', 'ulica', 'numer', 'centerX', 'centerY']