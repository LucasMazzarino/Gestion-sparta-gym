from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets

from Noticias.models import Noticia

from Noticias.api.serializers import NoticiaSerializer

class NoticiaViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = NoticiaSerializer
  queryset = Noticia.objects.filter(status='publicado')
  
