from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response



from Cursos.models import Curso
from Cursos.api.serializers import CursoSerializer


class CursoViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = CursoSerializer
  queryset = Curso.objects.exclude(state=False)


  
