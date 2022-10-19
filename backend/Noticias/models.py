from time import timezone
from django.db import models
from django.utils import timezone
from Users.models import Usuarios

from ckeditor.fields import RichTextField


class Noticia(models.Model):

  class Meta:
    ordering = ('-publicado',)
  
  def __str__(self):
     return self.titulo
  
  opciones = (
    ('borrador', 'Borrador'),
    ('publicado','Publicado')
  )
  
  #Esta es la noticia
  titulo = models.CharField(max_length = 250, unique=True)
  imagen = models.ImageField('Imagen Noticia',upload_to='noticias/imagenes/', null=True)
  descripcion = RichTextField(blank=True,null=True)
  publicado = models.DateTimeField(default=timezone.now) 
  autor = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name='autor')
  status = models.CharField(max_length=10, choices=opciones, default='borrador')
  
    
  
  
  
  

  