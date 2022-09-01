from django.db import models


class Horario(models.Model):
  id = models.AutoField(primary_key=True)
  horaInicio = models.TimeField()
  horaFin = models.TimeField()
  cuposLibres = models.PositiveSmallIntegerField(default=40)

  class Meta:
   verbose_name = 'Horario'
   verbose_name_plural = 'Horarios'

  def __str__(self):
     txt = "De {0} a {1} horas"
     return txt.format(self.horaInicio, self.horaFin)


class Cursos(models.Model):
  id = models.AutoField(primary_key=True)
  nombre = models.CharField(max_length=250)
  costo = models.PositiveSmallIntegerField(default=0)
  descripcion = models.TextField(max_length=250)  
  state = models.BooleanField('Estado',default = True)
  horario = models.ManyToManyField(Horario) 
  
  @property
  def ganancia(self):
    ganancia = self.usuarios_set.filter(pago_cuota=True).count()*self.costo
    return ganancia


  def __str__(self):
    txt = "{0} (Costo: $ {1} por mes)"
    return txt.format(self.nombre, self.costo)











