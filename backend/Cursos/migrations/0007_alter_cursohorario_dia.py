# Generated by Django 4.0.6 on 2022-09-06 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cursos', '0006_asistenciacursousuario_cursohorario_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cursohorario',
            name='dia',
            field=models.CharField(choices=[('Lu', 'Lunes'), ('Ma', 'Martes'), ('Mi', 'Miercoles'), ('Ju', 'Jueves'), ('Vi', 'Viernes'), ('Sa', 'Sabado')], default='Lu', max_length=50),
        ),
    ]
