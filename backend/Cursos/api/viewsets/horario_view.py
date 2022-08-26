from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response


from Cursos.models import Horario
from Cursos.api.serializers import HorarioSerializer


class HorariosViewSet(viewsets.ReadOnlyModelViewSet):
  model = Horario
  queryset = Horario.objects.all()
  serializer_class = HorarioSerializer

  
  

