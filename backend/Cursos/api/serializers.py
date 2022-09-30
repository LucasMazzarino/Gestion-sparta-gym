from rest_framework import serializers
from Cursos.models import Cursos,Horario, CursoHorario


class HorarioSerializer(serializers.ModelSerializer):
  class Meta:
    model = Horario
    fields = ('horaInicio','horaFin',)

    

class CursoHorarioserializer(serializers.ModelSerializer):
  horario = HorarioSerializer()
  class Meta: 
    model = CursoHorario
    fields = ('id','dia','cupo','horario')

class PartialCursoHorarioserializer(serializers.ModelSerializer):
  horario = HorarioSerializer()
  class Meta: 
    model = CursoHorario
    fields = ('id','dia','horario')
    

class CursoSerializer(serializers.ModelSerializer):
  horarios = CursoHorarioserializer(source='cursohorario_set',many=True,)
  class Meta:
   model = Cursos
   fields = ('id', 'nombre', 'costo','descripcion','imagen','horarios')


