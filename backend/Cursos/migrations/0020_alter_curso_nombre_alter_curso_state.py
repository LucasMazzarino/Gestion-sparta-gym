# Generated by Django 4.0.6 on 2022-10-20 02:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cursos', '0019_alter_pagocuota_recargo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='curso',
            name='nombre',
            field=models.CharField(max_length=250, unique=True),
        ),
        migrations.AlterField(
            model_name='curso',
            name='state',
            field=models.BooleanField(default=True, help_text='Si desactiva el curso este no se mostrara en la pagina principal', verbose_name='Estivar/desactivar'),
        ),
    ]