# Generated by Django 4.0.6 on 2022-08-24 02:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='pago_cuota',
            field=models.BooleanField(default=False),
        ),
    ]
