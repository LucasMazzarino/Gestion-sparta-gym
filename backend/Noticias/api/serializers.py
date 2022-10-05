from rest_framework import serializers
from Noticias.models import Noticia
from Users.api.serializers import NombreUsuarioSerializer

class NoticiaSerializer(serializers.ModelSerializer):
  autor = NombreUsuarioSerializer()
  class Meta:
    model = Noticia
    fields = ('titulo','descripcion','imagen','publicado','autor','status')