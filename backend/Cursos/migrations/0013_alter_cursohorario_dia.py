# Generated by Django 4.0.6 on 2022-10-01 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cursos', '0012_alter_cursos_imagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cursohorario',
            name='dia',
            field=models.CharField(choices=[('Lunes', 'Lunes'), ('Martes', 'Martes'), ('Miercoles', 'Miercoles'), ('Jueves', 'Jueves'), ('Viernes', 'Viernes'), ('Sabado', 'Sabado')], max_length=200),
        ),
    ]
