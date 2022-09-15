from django.db import models
from Users.models import Usuarios
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError


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
  usuarios = models.ManyToManyField(Usuarios, related_name='cursos')
  nombre = models.CharField(max_length=250)
  costo = models.PositiveSmallIntegerField(default=0)
  descripcion = models.TextField(max_length=250)  
  state = models.BooleanField('Estado',default = True)
  horarios = models.ManyToManyField(Horario, through='CursoHorario')
  pagos_cuotas = models.ManyToManyField(Usuarios, through='PagoCuota', related_name='pagos')
  asistencias = models.ManyToManyField(Usuarios, through='Asistencia', related_name='asistencias')
  
  @property
  def ganancia(self):
    ganancia = 0
    for pago in self.pagos_cuotas.through.objects.filter(curso_id=self.id):
      ganancia += pago.monto
    return ganancia

  def __str__(self):
    
    return self.nombre
  
class PagoCuota(models.Model):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
  curso = models.ForeignKey(Cursos, on_delete=models.CASCADE)
  dia_de_pago = models.DateField()

  
  def __str__(self):
    txt = "{0} (Pago: $ {1} del Curso {2})"
    return txt.format(self.usuario, self.monto, self.curso)

  @property
  def monto(self):
    monto = self.curso.costo
    if self.dia_de_pago.day > 10:
      monto+= 500
      return monto
    return monto
  
  def clean(self):
    usuario = self.usuario
    curso = self.curso.usuarios.all()
    if usuario not in curso:
      raise ValidationError("Este usuario no se encuentra en este curso.")
    
            

class CursoHorario(models.Model):
  
  dias = (
  ("Lunes","Lunes"),
  ("Martes","Martes"),
  ("Miercoles","Miercoles"),
  ("Juves","Jueves"),
  ("Viernes","Viernes"),
  ("Sabado","Sabado"),
 )
  horario = models.ForeignKey(Horario, on_delete=models.CASCADE)
  curso =models.ForeignKey(Cursos, on_delete=models.CASCADE)
  cupo = models.PositiveSmallIntegerField(default=40)
  dia = models.CharField(max_length=200, choices=dias)


class Asistencia(models.Model):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
  curso = models.ForeignKey(Cursos, on_delete=models.CASCADE)
  asistio = models.BooleanField(default=False)
  fecha = models.DateField()

  def __str__(self):
    txt = "{0} (Del curso {1}) "
    return  txt.format(self.usuario, self.curso)

  def clean(self):
    usuario = self.usuario
    curso = self.curso.usuarios.all()
    if usuario not in curso:
      raise ValidationError("Este usuario no se encuentra en este curso.")














