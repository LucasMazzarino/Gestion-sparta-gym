# Generated by Django 4.0.6 on 2022-09-21 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cursos', '0010_asistencia_cursos_asistencias_alter_cursohorario_dia_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cursohorario',
            name='usuario',
        ),
        migrations.AddField(
            model_name='cursos',
            name='imagen',
            field=models.ImageField(default='sparta_img.jpg', null=True, upload_to='cursos/imagenes/', verbose_name='Imagen de portada'),
        ),
        migrations.DeleteModel(
            name='AsistenciaCursoUsuario',
        ),
    ]
