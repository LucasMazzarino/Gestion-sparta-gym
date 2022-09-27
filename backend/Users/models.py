from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.conf import settings


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
  cedula = models.IntegerField(unique=True, null=False, blank=False)
  email = models.EmailField(max_length=250)
  direccion = models.CharField(max_length=250)
  #curso = models.ForeignKey(Cursos,on_delete=models.CASCADE,null=True)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  pago_cuota = models.BooleanField(default=False)
  reservas = models.ManyToManyField(to='Cursos.CursoHorario', through='ReservaUsuarios', blank=True, related_name='reserva')
  
  objects = UsuarioManager()

  USERNAME_FIELD = 'cedula'
  REQUIRED_FIELDS = ['nombre', 'apellido', 'email', 'direccion']
  
  
  
  def __str__(self):
    return self.nombre +" "+self.apellido
  

class ReservaUsuarios(models.Model):
  usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
  curso_horario = models.ForeignKey(to='Cursos.CursoHorario', on_delete=models.CASCADE)

