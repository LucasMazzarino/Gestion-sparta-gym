from django.db import models


class Horario(models.Model):
    id = models.AutoField(primary_key=True)
    horaInicio = models.TimeField()
    horaFin = models.TimeField()
    cuposLibres = models.PositiveSmallIntegerField(default=20)

    def __str__(self):
        txt = "De {0} a {1} horas"
        return txt.format(self.horaInicio, self.horaFin)


class Cursos(models.Model):
  id = models.AutoField(primary_key=True)
  nombre = models.CharField(max_length=250)
  costo = models.PositiveSmallIntegerField()
  descripcion = models.TextField(max_length=250)  
  categorias = [
        ('A', 'Ejercicio físico'),
        ('B', 'Cardio'),
        ('C', 'Danza')
  ]
  categoria = models.CharField(max_length=1, choices=categorias, default='A')
  horario = models.ForeignKey(Horario, on_delete=models.CASCADE) 


  def __str__(self):
        txt = "{0} (Costo: $ {1} por mes)"
        return txt.format(self.nombre, self.costo)











