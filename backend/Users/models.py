from django.db import models
from django.contrib.auth.models import User


class Usuarios(models.Model):

  class PosteoUsuarios (models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(esta_activo=True)

  nombre = models.CharField(max_length=250)
  pellido = models.CharField(max_length=250)
  cedula = models.IntegerField(unique=True, null=False, blank=False)
  email = models.EmailField(max_length=250)
  direccion = models.CharField(max_length=250)
  esta_activo = models.BooleanField(default=True)

  objectos = models.Manager() #default manager
  posteoobjetos = PosteoUsuarios() #custom manager
  
  # class Meta:
  #   orden = ('-apellido')
  
  def __str__(self):
      return self.nombre
  