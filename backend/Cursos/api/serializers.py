from rest_framework import serializers
from Cursos.models import Cursos,Horario


class HorarioSerializer(serializers.ModelSerializer):
  class Meta:
   model = Horario
   fields = ('horaInicio','horaFin','cuposLibres',)

    


class CursoSerializer(serializers.ModelSerializer):
  class Meta:
   model = Cursos
   fields = ('id', 'nombre', 'costo','descripcion',)
    