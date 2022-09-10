from rest_framework import serializers
from Cursos.models import Cursos,Horario, CursoHorario


class HorarioSerializer(serializers.ModelSerializer):
  class Meta:
   model = Horario
   fields = ('horaInicio','horaFin',)

    


class CursoSerializer(serializers.ModelSerializer):
  class Meta:
   model = Cursos
   fields = ('id', 'nombre', 'costo','descripcion',)


class CursoHorarioserializer(serializers.ModelSerializer):
  inicio = serializers.CharField(source='horario.horaInicio')
  fin = serializers.CharField(source='horario.horaFin')
  nombre = serializers.CharField(source='curso.nombre')

  class Meta: 
    model = CursoHorario
    fields = ('nombre','inicio','fin','dia')
    