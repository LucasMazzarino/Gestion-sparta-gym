from rest_framework import viewsets

from Cursos.models import CursoHorario
from Cursos.api.serializers import CursoHorarioserializer


class CursoHorarioViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = CursoHorarioserializer
  queryset = CursoHorario.objects.all().order_by('dia')
  