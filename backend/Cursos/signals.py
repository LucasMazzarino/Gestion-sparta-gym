# from django.contrib.auth.models import User
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import Cursos, CursoHorario

# @receiver([m2m_changed, post_save], sender=Cursos)
# def save_users(sender, instance, *kwargs):
#     curso_horarios = CursoHorario.objects.filter(curso__id=instance.id)
#     for curso_horario in curso_horarios:
#       curso_horario.usuario.set(Usuarios.objects.none())
#       curso_horario.usuario.add(self.usuarios.all())
#       curso_horario.save()