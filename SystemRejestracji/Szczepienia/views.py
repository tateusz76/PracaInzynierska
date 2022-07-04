from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import permissions

# Create your views here.


class PacjentList(generics.ListCreateAPIView):
    queryset = Pacjent.objects.all()
    serializer_class = PacjentSerializer
    name = 'pacjent-list'

class PacjentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pacjent.objects.all()
    serializer_class = PacjentSerializer
    name = 'pacjent-details'


class SzczepionkaList(generics.ListCreateAPIView):
    queryset = Szczepionka.objects.all()
    serializer_class = SzczepionkaSerializer
    name = 'szczepionka-list'

class SzczepionkaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Szczepionka.objects.all()
    serializer_class = SzczepionkaSerializer
    name = 'szczepionka-details'


class SzczepienieList(generics.ListCreateAPIView):
    queryset = Szczepienie.objects.all()
    serializer_class = SzczepienieSerializer
    name = 'szczepienie-list'

class SzczepienieDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Szczepienie.objects.all()
    serializer_class = SzczepienieSerializer
    name = 'szczepienie-details'


class ZaszczepionyList(generics.ListCreateAPIView):
    queryset = Zaszczepiony.objects.all()
    serializer_class = ZaszczepionySerializer
    name = 'zaszczepiony-list'

class ZaszczepionyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Zaszczepiony.objects.all()
    serializer_class = ZaszczepionySerializer
    name = 'zaszczepiony-details'




class ApiRoot(generics.GenericAPIView):
    name = 'api-root'

    def get(self, request, *args, **kwargs):
        return Response({'pacjenci': reverse(PacjentList.name, request=request),
                         'szczepionki': reverse(SzczepionkaList.name, request=request),
                         'szczepienia': reverse(SzczepienieList.name, request=request),
                         'zaszczepiony': reverse(ZaszczepionyList.name, request=request),
                         })