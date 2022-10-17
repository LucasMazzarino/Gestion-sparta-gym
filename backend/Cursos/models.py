
from django.db import models
from Users.models import Usuarios
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError

from ckeditor.fields import RichTextField

from django.db.models import Sum, F
from django.db.models.functions import Extract

class Horario(models.Model):
  id = models.AutoField(primary_key=True)
  horaInicio = models.TimeField()
  horaFin = models.TimeField()

  def clean(self):
    if self.horaInicio is None or self.horaFin is None:
      raise ValidationError('Complete los campos')
    elif self.horaInicio >= self.horaFin:
      raise ValidationError("La hr de inicio debe ser menor a la hr de fin")
    elif Horario.objects.filter(horaInicio=self.horaInicio,
     horaFin=self.horaFin).exists():
     raise ValidationError("Este horario ya existe")



  class Meta:
   verbose_name = 'Horario'
   verbose_name_plural = 'Horarios'

  def __str__(self):
     txt = "De {0} a {1} horas"
     return txt.format(self.horaInicio, self.horaFin)


class Curso(models.Model):
  id = models.AutoField(primary_key=True)
  usuarios = models.ManyToManyField(Usuarios, related_name='cursos')
  nombre = models.CharField(max_length=250)
  costo = models.PositiveSmallIntegerField(default=0)
  descripcion = RichTextField(blank=True, null=True)  
  imagen = models.ImageField('Imagen de portada',upload_to='cursos/imagenes/', null=True, default='cursos/imagenes/sparta_img.jpg')
  state = models.BooleanField('Estivar/desactivar',default = True, help_text="Si desactiva el curso este no se mostrara en la pagina principal")
  horarios = models.ManyToManyField(Horario, through='CursoHorario')
  pagos_cuotas = models.ManyToManyField(Usuarios, through='PagoCuota', related_name='pagos')
  asistencias = models.ManyToManyField(Usuarios, through='Asistencia', related_name='asistencias')
  
  def clean(self):
    if Curso.objects.exclude(id=self.id).filter(nombre=self.nombre.lower()):
      raise ValidationError("Ya existe un curso con este nombre")
    elif Curso.objects.exclude(id=self.id).filter(nombre=self.nombre):
       raise ValidationError("Ya existe un curso con este nombre")

  @property
  def ingresos(self):
    ingresos = 0
    for pago in self.pagos_cuotas.through.objects.filter(curso_id=self.id):
      ingresos += pago.monto_final
    return ingresos

  @property
  def ingresos_mensuales(self):
    ingresos_mensuales =  Curso.objects.get(id=self.id).pagos_cuotas.through.objects.filter(curso_id=self.id).annotate(
      month=Extract('dia_de_pago','month'), year=Extract('dia_de_pago','year'), monto=F('monto_final')).values('month', 'year').annotate(
      cant=Sum('monto')).values('month', 'year', 'cant').order_by('year','month')
    return ingresos_mensuales
    

  def __str__(self):
    return self.nombre

  
class PagoCuota(models.Model):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
  curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
  dia_de_pago = models.DateField()
  recargo = models.BooleanField(default=False,help_text="Marque la casilla si desea aplicar el recargo al pago",)
  monto_final = models.SmallIntegerField(default=0)

  def __str__(self):
    txt = "{0} (Pago: $ {1} del Curso {2})"
    return txt.format(self.usuario, self.monto_final, self.curso)

  # @property
  # def monto(self):
  #   monto = self.curso.costo
  #   if self.dia_de_pago.day > 10:
  #     monto+= 500
  #     return monto
  #   return monto

  def full_clean(self, exclude=None, validate_unique=True, validate_constraints=True):
      super().full_clean()
      curso = self.curso.usuarios.all() 
      if self.usuario not in curso:
        raise ValidationError("Este usuario no se encuentra en este curso.")
  
  def save(self,*args,**kwargs):
    self.monto_final = self.curso.costo
    if self.recargo == True:
      self.monto_final += 200 
    print(self.monto_final)
    super().save(*args,**kwargs)




@receiver(pre_save, sender=PagoCuota ,dispatch_uid="Valida_campo")
def validar_campos_nulos (sender, instance, **kwargs):
   c = instance.curso.usuarios.all()
   print()
   if instance.usuario is None:
     raise ValidationError("Debe selecionar un usuario")
   elif instance.curso is None:
     raise ValidationError("Debe selcionar un curso")
   elif instance.usuario not in c:
     raise ValidationError("El usuario no se encuentra en el curso")
  
            

class CursoHorario(models.Model):
  
  dias = (
  ("Lunes","Lunes"),
  ("Martes","Martes"),
  ("Miercoles","Miercoles"),
  ("Jueves","Jueves"),
  ("Viernes","Viernes"),
  ("Sabado","Sabado"),
 )
  horario = models.ForeignKey(Horario, on_delete=models.CASCADE)
  curso =models.ForeignKey(Curso, on_delete=models.CASCADE)
  cupo = models.PositiveSmallIntegerField(default=40)
  dia = models.CharField(max_length=200, choices=dias)
  
  def full_clean(self, exclude=None, validate_unique=True, validate_constraints=True):
    super().full_clean()
    cupo = self.cupo
    filtro = CursoHorario.objects.exclude(id=self.id).filter(curso=self.curso,
    dia=self.dia,
    horario = self.horario)
    if filtro.exists():
      raise ValidationError('Este Curso ya tiene registrado este horario')
    if cupo <= 0:
      raise ValidationError('No hay mas cupos libres para este horario')

@receiver(post_delete, sender=CursoHorario, dispatch_uid="create_elimniar_reserva")
def eliminar_reserva(sender, instance, **kwargs):
  cup = instance.cupo 
  if cup == 0:
    instance.cupo +1
    instance.save()


class Asistencia(models.Model):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE, null=False, blank=False)
  curso = models.ForeignKey(Curso, on_delete=models.CASCADE, null=False, blank=False)
  asistio = models.BooleanField(default=False)
  fecha = models.DateField()

  def __str__(self):
    txt = "{0} (Del curso {1}) "
    return  txt.format(self.usuario, self.curso)

  def full_clean(self, exclude=None, validate_unique=True, validate_constraints=True):
    super().full_clean()
    if Asistencia.objects.exclude(id=self.id).filter(usuario_id=self.usuario.id,curso_id=self.curso, fecha=self.fecha).exists():
      raise ValidationError('Ya has marcado asistencia para este usuario por hoy')
    if self.usuario not in self.curso.usuarios.all():
      raise ValidationError('Este usuario no se encuentra en este curso.')















