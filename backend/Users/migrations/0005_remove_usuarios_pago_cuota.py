# Generated by Django 4.0.6 on 2022-09-30 21:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0004_reservausuarios_usuarios_reservas_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuarios',
            name='pago_cuota',
        ),
    ]
