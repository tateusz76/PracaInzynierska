from django.shortcuts import render
from .models import *
import Szczepienia
from .serializers import *
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.permissions import IsAuthenticated
from Szczepienia.permissions import *
from django.shortcuts import get_list_or_404, get_object_or_404
from django.db.models import Q

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


class UserList(generics.ListCreateAPIView):
    serializer_class = PacjentSerializer
    permission_classes = [permissions.IsAuthenticated]
    name = 'pacjent-list'

    def get_queryset(self):
        user = self.request.user.username
        return Pacjent.objects.all().filter(username=user)


class PatientProfileEdit(generics.UpdateAPIView):
    serializer_class = PatientEditProfileSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get_object(self, *args, **kwargs):
        user = Pacjent.objects.get(id=self.request.user.id)
        return user


class SzczepionkaList(generics.ListCreateAPIView):
    queryset = Szczepionka.objects.all()
    serializer_class = SzczepionkaSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    name = 'szczepionka-list'


class SzczepionkaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Szczepionka.objects.all()
    serializer_class = SzczepionkaSerializer
    permission_classes = [IsAuthenticated,
                          IsAdminUser]
    name = 'szczepionka-details'


class SzczepionkaGet(generics.ListAPIView):
    queryset = Szczepionka.objects.all()
    serializer_class = SzczepionkaSerializer
    permission_classes = [IsAuthenticated]
    name = 'szczepionka-get'


class SzczepienieList(generics.ListCreateAPIView):
    serializer_class = SzczepienieSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnedByUser)

    name = 'szczepienie-list'

    def perform_create(self, serializer):
        serializer.save(pacjent=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Szczepienie.objects.filter(pacjent=user)


class SzczepienieDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SzczepienieSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnedByUser)

    name = 'szczepienie-details'

    def get_queryset(self):
        user = self.request.user
        return Szczepienie.objects.filter(pacjent=user)

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), pk=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class PunktList(generics.ListCreateAPIView):
    queryset = Punkt.objects.all()
    serializer_class = PunktSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)
    name = 'punkt-list'

class PunktDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Punkt.objects.all()
    serializer_class = PunktSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)
    name = 'punkt-details'


class GetPunkty(generics.ListAPIView):
    queryset = Punkt.objects.all()
    serializer_class = PunktSerializer
    permission_classes = (IsAuthenticated,)
    name = 'punkt-get'


class GetPunktyDetail(generics.RetrieveAPIView):
    queryset = Punkt.objects.all()
    serializer_class = PunktSerializer
    permission_classes = (IsAuthenticated,)
    name = 'punkt-get-detail'


class GetSzczepienie(generics.ListAPIView):
    queryset = Szczepienie.objects.all()
    serializer_class = SzczepienieSerializer
    permission_classes = (IsAuthenticated, IsOwnedByUser)
    name = 'szczepienie-get'

    def get_queryset(self):
        user = self.request.user
        return Szczepienie.objects.filter(pacjent=user)


class GetSzczepienieByPunkt(generics.ListAPIView):
    queryset = Szczepienie.objects.all()
    serializer_class = SzczepienieSerializer
    permission_classes = (IsAuthenticated,)
    name = 'szczepienie-get'


class EditSzczepienieDate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Szczepienie.objects.all()
    serializer_class = SzczepienieEditDateSerializer
    permission_classes = (IsAuthenticated, IsOwnedByUser)
    name = 'szczepienie-edit'

    def get_queryset(self):
        user = self.request.user
        return Szczepienie.objects.filter(pacjent=user)


class PracownikAdd(generics.ListCreateAPIView):
    queryset = Pracownik.objects.all()
    serializer_class = PracownikSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)
    name = 'pracownik-add'


class PracownikDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pracownik.objects.all()
    serializer_class = PracownikSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)
    name = 'pracownik-details'


class PracownikList(generics.ListAPIView):
    queryset = Pracownik.objects.all()
    serializer_class = PracownikSerializer
    permission_classes = (IsAuthenticated, IsPracownik)
    name = 'pracownik-list'

    def get_queryset(self):
        user = self.request.user
        return Pracownik.objects.filter(pracownik=user)


class PacjentListView(generics.ListAPIView):
    serializer_class = PacjentSerializer
    permission_classes = (IsAuthenticated, IsPracownik)
    name = 'pacjent-list-view'

    def get_queryset(self):
        user = self.request.user.username
        return Pacjent.objects.all().filter(~Q(username=user), ~Q(is_staff=True))


class ApiRoot(generics.GenericAPIView):
    name = 'api-root'

    def get(self, request, *args, **kwargs):
        return Response({#'pacjenci': reverse(PacjentList.name, request=request),
                         'szczepionki': reverse(SzczepionkaList.name, request=request),
                         'szczepienia': reverse(SzczepienieList.name, request=request),
                         # 'zaszczepiony': reverse(ZaszczepionyList.name, request=request),
                         'punkt': reverse(PunktList.name, request=request),
                         'edit': reverse(PatientProfileEdit.name, request=request),
                         'getPunkty': reverse(GetPunkty.name, request=request),
                         })