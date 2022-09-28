# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import ReservaUsuarios

# @receiver(post_save, sender=ReservaUsuarios, dispatch_uid="create_restar_cupo")
# def restar_cupo(sender, instance, **kwargs):
#   instance.curso_horario.cupo -= 1
#   print("\n\n\n")
#   print(instance.curso_horario.cupo)
#   instance.curso_horario.save()

#   post_save.connect(restar_cupo, sender=ReservaUsuarios)