from django.db import models
from Users.models import Usuarios
from Base.models import SoftDeleteModel
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.utils import timezone
from ckeditor.fields import RichTextField
from django.db.models import Sum, F
from django.db.models.functions import Extract

from datetime import date
from dateutil.relativedelta import relativedelta

class Horario(models.Model):
  id = models.AutoField(primary_key=True)
  horaInicio = models.TimeField()
  horaFin = models.TimeField()

  def clean(self):
    if self.horaInicio is None or self.horaFin is None:
      raise ValidationError('Complete los campos')
    elif self.horaInicio >= self.horaFin:
      raise ValidationError("La hr de inicio debe ser menor a la hr de fin")
    elif Horario.objects.exclude(id=self.id).filter(horaInicio=self.horaInicio,
     horaFin=self.horaFin).exists():
     raise ValidationError("Este horario ya existe")

  class Meta:
    verbose_name = 'Horario'
    verbose_name_plural = 'Horarios'
    ordering = ['horaInicio',]

  def __str__(self):
     txt = "De {0} a {1} horas"
     return txt.format(self.horaInicio.isoformat(timespec='minutes'), self.horaFin.isoformat(timespec='minutes'))
  

def calcular_fecha_vencimiento():
  hoy = date.today()
  if hoy.day > 1:
      mes_siguiente = hoy + relativedelta(months=1)
      return date(mes_siguiente.year, mes_siguiente.month, 1)
  else:
      return date(hoy.year, hoy.month, 1)
class Curso(SoftDeleteModel):
  id = models.AutoField(primary_key=True)
  usuarios = models.ManyToManyField(Usuarios, related_name='cursos', blank=True)
  nombre = models.CharField(max_length=250, unique=True)
  costo = models.PositiveSmallIntegerField(default=0)
  descripcion = RichTextField(blank=True, null=True)  
  imagen = models.ImageField('Imagen de portada',upload_to='cursos/imagenes/', null=True, default='cursos/imagenes/logoo.jpg')
  state = models.BooleanField('Activar/Desactivar',default = True, help_text="Si desactiva el curso este no se mostrara en la pagina principal")
  horarios = models.ManyToManyField(Horario, through='CursoHorario')
  pagos_cuotas = models.ManyToManyField(Usuarios, through='PagoCuota', related_name='pagos')
  asistencias = models.ManyToManyField(Usuarios, through='Asistencia', related_name='asistencias')
  vencimiento_cuota = models.DateField(default=calcular_fecha_vencimiento)

  
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

def pagos_pendientes(self):
        hoy = timezone.now().date()
        pagos = self.pagocuota_set.filter(dia_de_pago__lte=hoy, pago_pendiente=True)
        usuarios_con_pagos_pendientes = []
        for pago in pagos:
            usuarios_con_pagos_pendientes.append(pago.usuario)
        return usuarios_con_pagos_pendientes


class PagoCuota(SoftDeleteModel):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
  curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
  dia_de_pago = models.DateField()
  recargo = models.BooleanField(default=False,help_text="Marque la casilla si desea aplicar el recargo al pago",)
  monto_final = models.SmallIntegerField(default=0)

  class Meta:
    ordering = ['dia_de_pago',]

  def __str__(self):
    txt = "{0} (Pago: $ {1} del Curso {2} el dia{3})"
    return txt.format(self.usuario, self.monto_final, self.curso,self.dia_de_pago)

  def full_clean(self, exclude=None, validate_unique=True):
    super().full_clean(exclude=exclude, validate_unique=validate_unique) 
    curso = self.curso.usuarios.all()
    if self.usuario not in curso:
        raise ValidationError("Este usuario no se encuentra en este curso.")  
    pagos = PagoCuota.objects.filter(usuario=self.usuario, curso=self.curso)
    pagos_en_mes = pagos.filter(dia_de_pago__month=self.dia_de_pago.month)
    if self.pk is None and pagos_en_mes.exists():
        raise ValidationError("Este usuario ya ha realizado un pago en este curso este mes.")

  def save(self, *args, **kwargs):
      self.monto_final = self.curso.costo
      if self.recargo:
          self.monto_final += 200
      super().save(*args, **kwargs)

@receiver(pre_save, sender=PagoCuota ,dispatch_uid="Valida_campo")
def validar_campos_nulos (sender, instance, **kwargs):
   c = instance.curso.usuarios.all()
   if instance.usuario is None:
     raise ValidationError("Debe selecionar un usuario")
   elif instance.curso is None:
     raise ValidationError("Debe selcionar un curso")
   elif instance.usuario not in c:
     raise ValidationError("El usuario no se encuentra en el curso")
  
            

class CursoHorario(models.Model):
  
  dias = (
  ("1-Lunes","Lunes"),
  ("2-Martes","Martes"),
  ("3-Miercoles","Miercoles"),
  ("4-Jueves","Jueves"),
  ("5-Viernes","Viernes"),
  ("6-Sabado","Sabado"),
 )
  horario = models.ForeignKey(Horario, on_delete=models.CASCADE)
  curso =models.ForeignKey(Curso, on_delete=models.CASCADE)
  cupo = models.PositiveSmallIntegerField(default=40)
  dia = models.CharField(max_length=200, choices=dias)
  
  def full_clean(self, exclude=None, validate_unique=True, validate_constraints=True):
    errors = {}
    addUnico = {'horario':self.horario.id, 'dia':self.dia}
    if self.curso.id:
      try:
        super().full_clean()
      except ValidationError as e:
        errors = e.update_error_dict(errors)
    # doble = {}
    # for key, value in addUnico.items():
    #   doble.setdefault(value, set()).add(key)

    # res = filter(lambda x: len(x) >1, doble.values())

    # print("New Dictionary:",list(res))
    if getattr(self,'horario',None):
      filtro = CursoHorario.objects.exclude(id=self.id).filter(curso=self.curso,
      dia=self.dia,
      horario = self.horario)
      if filtro.exists():
        raise ValidationError('Este Curso ya tiene registrado este horario')
    else:
      errors = {**errors,'horario': ValidationError('Asigne un horario')}
    if self.cupo == 0:
      errors = {**errors,'cupo': ValidationError('No hay mas cupos libres para este horario')}   
    if errors:
      raise ValidationError(errors)  
    
  def __str__(self):
    txt = "{0} el dia {1} {2}"
    return txt.format(self.curso ,self.dia.translate({ord(i): None for i in '123456-'}), self.horario)
  
  class Meta:
    ordering = ['dia','horario__horaInicio']
      

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















