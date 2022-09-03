from django.db import models
from Users.models import Usuarios

class Horario(models.Model):
  id = models.AutoField(primary_key=True)
  horaInicio = models.TimeField()
  horaFin = models.TimeField()

  class Meta:
   verbose_name = 'Horario'
   verbose_name_plural = 'Horarios'

  def __str__(self):
     txt = "De {0} a {1} horas"
     return txt.format(self.horaInicio, self.horaFin)


class Cursos(models.Model):
  id = models.AutoField(primary_key=True)
  usuarios = models.ManyToManyField(Usuarios)
  nombre = models.CharField(max_length=250)
  costo = models.PositiveSmallIntegerField(default=0)
  descripcion = models.TextField(max_length=250)  
  state = models.BooleanField('Estado',default = True)
  horarios = models.ManyToManyField(Horario, through='CursoHorario') 
  
  @property
  def ganancia(self):
    ganancia = self.usuarios.filter(pago_cuota=True).count()*self.costo
    return ganancia


  def __str__(self):
    txt = "{0} (Costo: $ {1} por mes)"
    return txt.format(self.nombre, self.costo)


class CursoHorario(models.Model):
  horario = models.ForeignKey(Horario, on_delete=models.CASCADE)
  curso =models.ForeignKey(Cursos, on_delete=models.CASCADE)
  usuario = models.ManyToManyField(Usuarios, through='AsistenciaCursoUsuario')
  cupo = models.PositiveSmallIntegerField(default=40)
  dia = models.DateField()

class AsistenciaCursoUsuario(models.Model):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
  curso_horario = models.ForeignKey(CursoHorario, on_delete=models.CASCADE)
  asistencia = models.BooleanField(default=False)
  
  def get_usuarios(self, obj):
        return "\n".join([u.usuario for u in obj.usuario.all()])










