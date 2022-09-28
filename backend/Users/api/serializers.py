from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from Users.models import Usuarios, ReservaUsuarios
from Cursos.models import Cursos
from Cursos.api.serializers import CursoSerializer,CursoHorarioserializer

class UsuariosSerializer(serializers.ModelSerializer):
  cursos = CursoSerializer(many=True,)
  class Meta:
    model=Usuarios
    fields = ('id','nombre','apellido','cedula','email','direccion','is_staff','cursos')
    extra_kwargs = {'password':{'write_only': True, 'min_length': 5}}

class UsuariosPartialSerializer(serializers.ModelSerializer):
  class Meta:
    model=Usuarios
    fields = ('id','nombre','apellido','cedula')

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  pass

class ReservaUsuariosSerializer(serializers.ModelSerializer):
  usuario = UsuariosPartialSerializer()
  curso_horario = CursoHorarioserializer()
  class Meta:
    model=ReservaUsuarios
    fields = ('usuario','curso_horario')

class CrearReservaUsuarioSerializer(serializers.ModelSerializer):
  class Meta:
    model=ReservaUsuarios
    fields = ('usuario','curso_horario')

  def validate_usuario(self, value):
    print(self)
    print(self.context['request'].data)
    cu_ho = self.context['request'].data['curso_horario']
    curso = Cursos.objects.get(cursohorario=cu_ho)
    if value not in curso.usuarios.all():
        raise serializers.ValidationError("Este usario no se encuentra en el curso")
    return value