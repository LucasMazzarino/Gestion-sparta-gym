from django.db import models
from Users.models import Usuarios
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver


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
  
  # def save(self, *args, **kwargs):
  #     super(Cursos,self).save(*args,**kwargs)
  #     print(self.usuarios.all())
  #     curso_horarios = CursoHorario.objects.filter(curso__id=self.id)
  #     for curso_horario in curso_horarios:
  #       # for usuario in curso_horario.usuario.all():
  #       #   curso_horario.usuario.remove(usuario)
  #       #   curso_horario.save()
  #       curso_horario.usuario.set(Usuarios.objects.none()) 
  #       curso_horario.usuario.add(*self.usuarios.all())
  #       curso_horario.save()

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
  usuario = models.ManyToManyField(Usuarios, through='AsistenciaCursoUsuario')
  cupo = models.PositiveSmallIntegerField(default=40)
  dia = models.CharField(max_length=200, choices=dias)

class AsistenciaCursoUsuario(models.Model):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
  curso_horario = models.ForeignKey(CursoHorario, on_delete=models.CASCADE)
  asistencia = models.BooleanField(default=False)

class Asistencia(models.Model):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
  curso = models.ForeignKey(Cursos, on_delete=models.CASCADE)
  asistio = models.BooleanField(default=False)
  fecha = models.DateField()














