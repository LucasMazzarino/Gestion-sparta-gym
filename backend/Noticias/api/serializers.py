from rest_framework import serializers
from Noticias.models import Noticia

class NoticiaSerializer(serializers.ModelSerializer):
  class Meta:
    model = Noticia
    fields = ('titulo','descripcion','publicado','slug','autor','status',)