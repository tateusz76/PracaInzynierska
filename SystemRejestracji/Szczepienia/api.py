from Szczepienia.models import *
from rest_framework import viewsets, permissions
from .serializers import PacjentSerializer


class PacjentViewSet(viewsets.ModelViewSet):
    queryset = Pacjent.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PacjentSerializer
