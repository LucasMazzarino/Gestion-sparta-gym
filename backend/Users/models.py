from xml.dom import ValidationErr
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from django.conf import settings
from django.core.exceptions import ValidationError



class UsuarioManager(BaseUserManager):

  def create_user(self, nombre, apellido, documento, email, direccion, password=None, **extra_filds):
    '''crea y guarda un nuevo usuario'''
    if not documento:
      raise ValueError('El usuario debe tener una documento')

    usuario = self.model(
      nombre=nombre,
      apellido=apellido,
      documento=documento,
      email=self.normalize_email(email), 
      direccion=direccion, 
      **extra_filds
      )
    usuario.set_password(password)
    usuario.save(using=self._db)

    return usuario
  
  def create_superuser(self, nombre, apellido, documento, email, direccion, password=None):
    '''creacion de super usuario con documento'''
    usuario = self.create_user(nombre, apellido, documento, email, direccion, password)
    usuario.is_staff = True
    usuario.is_superuser = True
    usuario.save(using=self._db)

    return usuario


class Usuarios(AbstractBaseUser, PermissionsMixin):   
  nombre = models.CharField(max_length=250)
  apellido = models.CharField(max_length=250)
  documento = models.IntegerField(unique=True, null=False, blank=False, help_text="Ingrese su Cedula o su DNI",)
  email = models.EmailField(max_length=250, unique=True)
  direccion = models.CharField(max_length=250)
  is_active = models.BooleanField(default=True, help_text="Si desactiva al usuario, no podra agregarle pagos, asistencias, ni asignarlo a un Curso o horario")
  is_staff = models.BooleanField(default=False)
  reservas = models.ManyToManyField(to='Cursos.CursoHorario', through='ReservaUsuarios', blank=True, related_name='reserva')
  
  objects = UsuarioManager()

  USERNAME_FIELD = 'documento'
  REQUIRED_FIELDS = ['nombre', 'apellido', 'email', 'direccion']
  
  def clean(self):
    docu = self.documento
    if docu < 10000000:
      raise ValidationError("El documento debe tener 8 digitos")
    if docu > 99999999:
      raise ValidationError("El documento debe tener 8 digitos")
  
  
  def __str__(self):
    return self.nombre +" "+self.apellido
    
  

class ReservaUsuarios(models.Model):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
  curso_horario = models.ForeignKey(to='Cursos.CursoHorario', on_delete=models.CASCADE)

  def validate_unique(self, *args, **kwargs):
    filtro_dia = ReservaUsuarios.objects.exclude(id=self.id).filter(
        usuario_id = self.usuario_id,
        curso_horario__curso__nombre = self.curso_horario.curso.nombre,
        curso_horario__dia = self.curso_horario.dia,
    ).exists()
    filto_curso = ReservaUsuarios.objects.exclude(id=self.id).filter(
        usuario_id = self.usuario_id,
        curso_horario__curso__nombre = self.curso_horario.curso.nombre,
        curso_horario__id = self.curso_horario.id
      ).exists()
    if filto_curso:
        raise ValidationError('Este usuario ya tiene una reserva en este horario')
    if filtro_dia:
        raise ValidationError('Este usuario ya tiene una reserva para este curso por el dia de hoy')
    return super().validate_unique(*args, **kwargs)
  


@receiver(post_save, sender=ReservaUsuarios, dispatch_uid="create_restar_cupo")
def restar_cupo(sender, instance, **kwargs):
  instance.curso_horario.cupo -= 1
  instance.curso_horario.save()

@receiver([post_delete],sender=ReservaUsuarios, dispatch_uid="create_sumar_cupo")
def sumar_cupo(sender, instance, **kwargs):
  instance.curso_horario.cupo +=1
  instance.curso_horario.save()

