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