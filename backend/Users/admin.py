from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from Users import models

class UserAdmin(BaseUserAdmin):
    ordering = ['apellido']
    list_display= ['cedula', 'nombre','apellido',]
    fieldsets = (
        (None,{'fields':('cedula',)}),
        (_('Informacion personal'),{'fields':('nombre','apellido', 'direccion','email',)}),
        (
            _('Permissions'),
            {'fields':('is_active', 'is_staff')}
        ),
    )
    add_fieldsets = (
        (None,{
            'classes':('wide',),
            'fields':('cedula','nombre','apellido','direccion','email','password1', 'password2')
        }),
    )

admin.site.register(models.Usuarios,UserAdmin)

