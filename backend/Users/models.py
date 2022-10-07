from xml.dom import ValidationErr
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.db.models.signals import post_save
from django.dispatch import receiver

from django.conf import settings
from django.core.exceptions import ValidationError



class UsuarioManager(BaseUserManager):

  def create_user(self, nombre, apellido, cedula, email, direccion, password=None, **extra_filds):
    '''crea y guarda un nueov usuario'''
    if not cedula:
      raise ValueError('El usuario debe tener una cedula')

    usuario = self.model(
      nombre=nombre,
      apellido=apellido,
      cedula=cedula,
      email=self.normalize_email(email), 
      direccion=direccion, 
      **extra_filds
      )
    usuario.set_password(password)
    usuario.save(using=self._db)

    return usuario
  
  def create_superuser(self, nombre, apellido, cedula, email, direccion, password=None):
    '''creacion de super usuario con cedula'''
    usuario = self.create_user(nombre, apellido, cedula, email, direccion, password)
    usuario.is_staff = True
    usuario.is_superuser = True
    usuario.save(using=self._db)

    return usuario


class Usuarios(AbstractBaseUser, PermissionsMixin):   
  nombre = models.CharField(max_length=250)
  apellido = models.CharField(max_length=250)
  cedula = models.IntegerField(unique=True, null=False, blank=False, help_text="Ingrese su Cedula o su DNI",)
  email = models.EmailField(max_length=250)
  direccion = models.CharField(max_length=250)
  #curso = models.ForeignKey(Cursos,on_delete=models.CASCADE,null=True)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  reservas = models.ManyToManyField(to='Cursos.CursoHorario', through='ReservaUsuarios', blank=True, related_name='reserva')
  
  objects = UsuarioManager()

  USERNAME_FIELD = 'cedula'
  REQUIRED_FIELDS = ['nombre', 'apellido', 'email', 'direccion']
  
  def clean(self):
    docu = self.cedula
    if docu <= 10000000:
      raise ValidationError("El documento debe tener 8 digitos")
    if docu >= 99999999:
      raise ValidationError("El documento debe tener 8 digitos")
  
  
  def __str__(self):
    return self.nombre +" "+self.apellido
    
  

class ReservaUsuarios(models.Model):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
  curso_horario = models.ForeignKey(to='Cursos.CursoHorario', on_delete=models.CASCADE)

  # def clean(self):
  #    from Cursos.models import CursoHorario

  #    usuario = self.usuario
  #    cu_ho = CursoHorario.objects.filter(reserva=usuario, dia=self.curso_horario.dia, curso__nombre=self.curso_horario.curso.nombre, id=self.curso_horario.id)
  #    if cu_ho.exists():  
  #      raise ValidationError("no se puede agrear")

  def validate_unique(self, *args, **kwargs):
        qs = ReservaUsuarios.objects.exclude(id=self.id).filter(
            usuario_id = self.usuario_id,
            curso_horario__curso__nombre = self.curso_horario.curso.nombre,
            curso_horario__dia = self.curso_horario.dia,
        ).exists()
        hf = ReservaUsuarios.objects.exclude(id=self.id).filter(
            usuario_id = self.usuario_id,
            curso_horario__curso__nombre = self.curso_horario.curso.nombre,
            curso_horario__id = self.curso_horario.id
          ).exists()
        if hf:
            raise ValidationError('Este usuario ya tiene una reserva en este horario')
        if qs:
            raise ValidationError('Este usuario ya tiene una reserva para este curso por el dia de hoy')
        return super().validate_unique(*args, **kwargs)

    


@receiver(post_save, sender=ReservaUsuarios, dispatch_uid="create_restar_cupo")
def restar_cupo(sender, instance, **kwargs):
  instance.curso_horario.cupo -= 1
  instance.curso_horario.save()