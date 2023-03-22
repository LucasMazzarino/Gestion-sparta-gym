from attr import fields
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from Users.models import Usuarios, ReservaUsuario
from Cursos.models import Curso,CursoHorario
from Cursos.api.serializers import CursoSerializer,CursoHorarioserializer,PartialCursoHorarioserializer,TodosPagosSerializer

class UsuariosSerializer(serializers.ModelSerializer):
  cursos = CursoSerializer(many=True,)
  class Meta:
    model=Usuarios
    fields = ('id','nombre','apellido','documento','email','direccion','is_staff','cursos',)
    extra_kwargs = {'password':{'write_only': True, 'min_length': 5}}

class UsuariosPartialSerializer(serializers.ModelSerializer):
  class Meta:
    model=Usuarios
    fields = ('id',)

class NombreUsuarioSerializer(serializers.ModelSerializer):
  class Meta:
    model=Usuarios
    fields =('nombre',)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  pass


class PartialReservaUsuariosSerializer(serializers.ModelSerializer):
  curso_horario = PartialCursoHorarioserializer()
  class Meta:
    model=ReservaUsuario
    fields = ('id','curso_horario',)

# serializador para listar las reservas de un usuario
class ListaReservasUsuariosSerializer(serializers.ModelSerializer):
  reservas = PartialReservaUsuariosSerializer(source='reservausuario_set',many=True,)
  class Meta:
    model=Usuarios
    fields = ('reservas',)

# serializador por defecto para crear al reserva
class ReservaUsuariosSerializer(serializers.ModelSerializer):
  usuario = UsuariosPartialSerializer()
  curso_horario = CursoHorarioserializer()
  class Meta:
    model=ReservaUsuario
    fields = ( 'usuario','curso_horario')


# serializadr para crear la reserva con post
class CrearReservaUsuarioSerializer(serializers.ModelSerializer):
  class Meta:
    model=ReservaUsuario
    fields = ('usuario','curso_horario')

  def validate_usuario(self, value):
    cu_ho = self.context['request'].data['curso_horario']
    curso = Curso.objects.get(cursohorario=cu_ho)
    reservass = CursoHorario.objects.get(id=cu_ho)
    por_dia = value.reservas.filter(dia=reservass.dia)
    por_nombre =value.reservas.filter(curso__nombre=curso.nombre)
 
    if value in reservass.reserva.all():
      raise serializers.ValidationError("Ya tienes una reserva en este horario")
    elif por_dia.exists() and por_nombre.exists():
      raise serializers.ValidationError("Ya tienes una reserva para este curso por el dia")
    elif value not in curso.usuarios.all():
        raise serializers.ValidationError("Este usario no se encuentra en el curso")
    return value

class ListaPagosUsuariosSerializer(serializers.ModelSerializer):
  pagos = TodosPagosSerializer(many=True)
  class Meta:
    model=Usuarios
    fields = ('nombre','apellido','pagos')

  