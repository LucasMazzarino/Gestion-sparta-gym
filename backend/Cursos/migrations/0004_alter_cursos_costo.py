# Generated by Django 4.0.6 on 2022-08-27 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cursos', '0003_alter_horario_options_cursos_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cursos',
            name='costo',
            field=models.PositiveSmallIntegerField(default=0),
        ),
    ]
