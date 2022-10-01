from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from Users.models import Usuarios

from rest_framework_simplejwt.token_blacklist import models
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin

class NewOutstandingTokenAdmin(OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True

admin.site.unregister(models.OutstandingToken)
admin.site.register(models.OutstandingToken, NewOutstandingTokenAdmin)

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
            'fields':('cedula','nombre','apellido','direccion','email','password1', 'password2',)
        }),
    )

admin.site.register(Usuarios,UserAdmin)

