from time import timezone
from django.db import models
from django.utils import timezone
from Users.models import Usuarios


# def user_directory_path(instance, filename):
#   return 'noticia/{0}/{1}'.format(instance.title, filename)

class Noticia(models.Model):

  class Meta:
    ordering = ('-publicado',)

  # class PostObjects(models.Manager):
  #   def get_queryset(self):
  #     return super().get_queryset().filter(status='publicado')
  
  def __str__(self):
     return self.titulo
  
  opciones = (
    ('borrador', 'Borrador'),
    ('publicado','Publicado')
  )
  
  #Esta es la noticia
  titulo = models.CharField(max_length = 250)
  imagen = models.ImageField('Imagen Noticia',upload_to='noticias/imagenes/', null=True)
  descripcion = models.TextField(null=True)
  slug = models.SlugField(max_length=250, unique_for_date='publicado', null=False, unique=True) 
  publicado = models.DateTimeField(default=timezone.now) 
  autor = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name='autor')
  status = models.CharField(max_length=10, choices=opciones, default='borrador')
  #postobjects = PostObjects()
    
  
  
  
  

  