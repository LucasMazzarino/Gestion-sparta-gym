from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from Users.models import Usuarios, ReservaUsuario

from rest_framework_simplejwt.token_blacklist import models
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin

class NewOutstandingTokenAdmin(OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
      return True

admin.site.unregister(models.OutstandingToken)
admin.site.register(models.OutstandingToken, NewOutstandingTokenAdmin)

class UserAdmin(BaseUserAdmin):
	ordering = ['apellido']
	list_display= ['nombre','apellido','documento']
	search_fields = ['nombre']
	list_per_page= 30
	list_filter = ('is_superuser','is_staff','is_active','cursos')
	fieldsets = (
		(None,{'fields':('documento',)}),
		(_('Informacion personal'),{'fields':('nombre','apellido', 'direccion','email','telefono')}),
		(
				_('Permissions'),
				{'fields':('is_active', 'is_staff')}
		),
	)
	add_fieldsets = (
		(None,{
				'classes':('wide',),
				'fields':('documento','nombre','apellido','direccion','email','telefono','password1', 'password2',)
		}),
	)
	def render_change_form(self, request, context, add=False, change=False, form_url='', obj=None):
			context.update({
				'show_save_and_continue': False,
				'show_save_and_add_another': False 
		})
			return super().render_change_form(request, context, add, change, form_url, obj)

@admin.register(ReservaUsuario)	
class ReservaUsuariosAdmin(admin.ModelAdmin):
	model = ReservaUsuario
	list_filter = ('usuario',)
	readonly_fields = ('usuario', 'curso_horario')
	list_per_page= 30

	def render_change_form(self, request, context, add=False, change=False, form_url='', obj=None):
			context.update({
				'show_save': False,
				'show_save_and_continue': False,
				'show_save_and_add_another': False,
		})
			return super().render_change_form(request, context, add, change, form_url, obj)
		

admin.site.register(Usuarios,UserAdmin)


