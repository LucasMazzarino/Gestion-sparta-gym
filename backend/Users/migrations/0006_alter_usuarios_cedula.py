# Generated by Django 4.0.6 on 2022-10-06 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0005_remove_usuarios_pago_cuota'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='cedula',
            field=models.IntegerField(help_text='Ingrese su Cedula o su DNI', unique=True),
        ),
    ]