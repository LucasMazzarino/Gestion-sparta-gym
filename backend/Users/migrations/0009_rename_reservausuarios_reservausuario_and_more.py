# Generated by Django 4.0.6 on 2022-10-20 02:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cursos', '0020_alter_curso_nombre_alter_curso_state'),
        ('Users', '0008_rename_cedula_usuarios_documento'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ReservaUsuarios',
            new_name='ReservaUsuario',
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='is_active',
            field=models.BooleanField(default=True, help_text='Si desactiva al usuario, no podra agregarle pagos, asistencias, ni asignarlo a un Curso o horario', verbose_name='Esta activo'),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='is_staff',
            field=models.BooleanField(default=False, verbose_name='Es del Staff?'),
        ),
    ]
