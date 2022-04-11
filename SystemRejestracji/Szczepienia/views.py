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


class ApiRoot(generics.GenericAPIView):
    name = 'api-root'

    def get(self, request, *args, **kwargs):
        return Response({'pacjenci': reverse(PacjentList.name, request=request),
                         'szczepionki': reverse(SzczepionkaList.name, request=request),})