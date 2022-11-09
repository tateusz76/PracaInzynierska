from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.permissions import IsAuthenticated
from Szczepienia.permissions import IsOwnerOrReadOnly
from django.shortcuts import get_list_or_404, get_object_or_404

# Create your views here.


# class PacjentList(generics.ListCreateAPIView):
#     queryset = Pacjent.objects.all()
#     serializer_class = PacjentSerializer
#     name = 'pacjent-list'
#
# class PacjentDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Pacjent.objects.all()
#     serializer_class = PacjentSerializer
#     name = 'pacjent-details'


class PatientProfileEdit(generics.UpdateAPIView):
    serializer_class = PatientEditProfileSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get_object(self, *args, **kwargs):
        user = Pacjent.objects.get(id=self.request.user.id)
        return user


class SzczepionkaList(generics.ListCreateAPIView):
    queryset = Szczepionka.objects.all()
    serializer_class = SzczepionkaSerializer
    permission_classes = [IsAuthenticated,
                          IsAdminUser]
    name = 'szczepionka-list'

class SzczepionkaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Szczepionka.objects.all()
    serializer_class = SzczepionkaSerializer
    permission_classes = [IsAuthenticated,
                          IsAdminUser]
    name = 'szczepionka-details'


class SzczepienieList(generics.ListCreateAPIView):
    serializer_class = SzczepienieSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    name = 'szczepienie-list'

    def get_queryset(self):
        user = self.request.user
        return Szczepienie.objects.filter(pacjent=user)

    def get_object(self):
        obj = get_object_or_404(self.get_queryset())
        self.check_object_permissions(self.request, obj)
        return obj


class SzczepienieDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SzczepienieSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    name = 'szczepienie-details'

    def get_queryset(self):
        user = self.request.user
        return Szczepienie.objects.filter(pacjent=user)

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), pk=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


# class ZaszczepionyList(generics.ListCreateAPIView):
#     queryset = Zaszczepiony.objects.all()
#     serializer_class = ZaszczepionySerializer
#     name = 'zaszczepiony-list'
#
# class ZaszczepionyDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Zaszczepiony.objects.all()
#     serializer_class = ZaszczepionySerializer
#     name = 'zaszczepiony-details'


class PunktList(generics.ListCreateAPIView):
    queryset = Punkt.objects.all()
    serializer_class = PunktSerializer
    permission_classes = (AllowAny,)
    name = 'punkt-list'

class PunktDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Punkt.objects.all()
    serializer_class = PunktSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)
    name = 'punkt-details'


class ApiRoot(generics.GenericAPIView):
    name = 'api-root'

    def get(self, request, *args, **kwargs):
        return Response({#'pacjenci': reverse(PacjentList.name, request=request),
                         'szczepionki': reverse(SzczepionkaList.name, request=request),
                         'szczepienia': reverse(SzczepienieList.name, request=request),
                         # 'zaszczepiony': reverse(ZaszczepionyList.name, request=request),
                         'punkt': reverse(PunktList.name, request=request),
                         'edit': reverse(PatientProfileEdit.name, request=request),
                         })