from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from Users import models

class UserAdmin(BaseUserAdmin):
    ordering = ['apellido']
    list_display= ['cedula', 'nombre']
    fieldsets = (
        (None,{'fields':('cedula', 'password')}),
        (_('Personal Info'),{'fields':('nombre','apellido', 'direccion',)}),
        (
            _('Permissions'),
            {'fields':('is_active', 'is_staff', 'is_superuser')}
        ),
        (_('Important Dates'), {'fields': ('last_login',)})
    )
    add_fieldsets = (
        (None,{
            'classes':('wide',),
            'fields':('cedula','nombre','apellido','direccion','password1', 'password2')
        }),
    )

admin.site.register(models.Usuarios,UserAdmin)

