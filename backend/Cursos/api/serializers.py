from rest_framework import serializers
from Cursos.models import Curso,Horario, CursoHorario

class HorarioSerializer(serializers.ModelSerializer):
  class Meta:
    model = Horario
    fields = ('horaInicio','horaFin',)


class CursoHorarioserializer(serializers.ModelSerializer):
  horario = HorarioSerializer()
  class Meta: 
    model = CursoHorario
    fields = ('id','dia','cupo','horario')

class CursoSerializer(serializers.ModelSerializer):
  horarios = CursoHorarioserializer(source='cursohorario_set',many=True,)
  class Meta:
   model = Curso
   fields = ('id', 'nombre', 'costo','descripcion','imagen','horarios')

class PartialCursoSerializer(serializers.ModelSerializer):
  class Meta:
   model = Curso
   fields = ('nombre',)

class PartialCursoHorarioserializer(serializers.ModelSerializer):
  horario = HorarioSerializer()
  curso = PartialCursoSerializer()
  class Meta: 
    model = CursoHorario
    fields = ('id','curso','dia','horario',)

class IngresosSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Curso
    fields = ('id','nombre','ingresos','ingresos_mensuales')


