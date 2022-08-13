from django.db import models
from Users import models


class Cursos(models.Model):
  id = models.AutoField(primary_key=True)
  nombre = models.CharField(max_length=250)
#   apellido = models.CharField(max_length=250)
#   cedula = models.IntegerField(unique=True, null=False, blank=False)
#   email = models.EmailField(max_length=250)
#   direccion = models.CharField(max_length=250)
#   is_active = models.BooleanField(default=True)
#   is_staff = models.BooleanField(default=False)