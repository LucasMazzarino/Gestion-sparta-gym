from rest_framework import serializers
from .models import Usuarios

class UsuariosSerializer(serializers.ModelSerializer):
  class Meta:
    model=Usuarios
    fields = ('id','nombre','apellido','cedula','email','direccion',)
    extra_kwargs = {'password':{'write_only': True, 'min_length': 5}}