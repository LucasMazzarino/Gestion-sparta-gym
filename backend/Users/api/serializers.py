from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from Users.models import Usuarios

class UsuariosSerializer(serializers.ModelSerializer):
  class Meta:
    model=Usuarios
    fields = ('id','nombre','apellido','cedula','email','direccion','is_staff')
    extra_kwargs = {'password':{'write_only': True, 'min_length': 5}}

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  pass

    