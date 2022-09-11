from ast import In
from django.contrib.auth.models import User
from django.db.models.signals import post_save,m2m_changed, pre_save
from django.dispatch import receiver

from backend.Cursos.admin import PagoCuotaInline
from backend.Users.models import Usuarios
from .models import Cursos, PagoCuota


# def save_users(sender, instance, *kwargs):
#     curso_horarios = CursoHorario.objects.filter(curso__id=instance.id)
#     for curso_horario in curso_horarios:
#       curso_horario.usuario.set(Usuarios.objects.none())
#       curso_horario.usuario.add(self.usuarios.all())
#       curso_horario.save()

# m2m_changed.connect(save_users, sender=CursoHorario)

# @receiver(m2m_changed, sender=Cursos) 
# def asignar_usuarios_cursohorario(sender,instance,**kwargs):
#   curso_horarios = CursoHorario.objects.filter(curso__id=instance.id)
#   for curso_horario in curso_horarios:
#     curso_horario.usuario.set(Usuarios.objects.none())
#     curso_horario.usuario.add(Usuarios.all())
#     curso_horario.save()
  
# post_save.connect(asignar_usuarios_cursohorario,sender = Cursos)
# @receiver(pre_save, sender=PagoCuota)
# def save_pagos(sender, instance, **kwargs):
#     u_cursos = Usuarios.objects.filter(c


    