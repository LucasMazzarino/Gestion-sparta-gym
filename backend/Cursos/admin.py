from django.contrib import admin

from Cursos import models
from .models import Horario


@admin.register(models.Cursos)
class CursoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'costo')
    ordering = ['id']
    
admin.site.register(models.Horario)
