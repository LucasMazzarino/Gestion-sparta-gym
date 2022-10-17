from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from Cursos.models import Curso
from Cursos.api.serializers import IngresosSerializer


class IngresosViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = IngresosSerializer
  queryset = Curso.objects.all()
