from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets

from Noticias.models import Noticia

from Noticias.api.serializers import NoticiaSerializer

class NoticiaViewSet(viewsets.ReadOnlyModelViewSet):
  model = Noticia
  queryset = Noticia.objects.all()
  serializer_class = NoticiaSerializer
