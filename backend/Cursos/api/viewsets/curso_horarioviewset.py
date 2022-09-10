from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from Cursos.models import CursoHorario
from Cursos.api.serializers import CursoHorarioserializer


class CursoHorarioViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = CursoHorarioserializer
  queryset = CursoHorario.objects.all()
  