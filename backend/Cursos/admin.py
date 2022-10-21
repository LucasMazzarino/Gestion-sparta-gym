from django.contrib import admin
from django.contrib.auth.models import Group
from django.utils.translation import gettext as _

from .models import Horario, Curso, CursoHorario, PagoCuota, Asistencia
from Users.models import Usuarios,ReservaUsuario
from django.utils.html import format_html_join
			

class PagoCuotaInline(admin.TabularInline):
	model = PagoCuota
	fields = ('usuario','dia_de_pago','recargo')
	extra = 1
	list_filter = ('dia_de_pago',)

	def formfield_for_foreignkey(self, db_field, request, **kwargs):
		if db_field.name == 'usuario':
			cur_id = request.resolver_match.kwargs.get('object_id', None)
			if cur_id:
				kwargs['queryset'] = Usuarios.objects.exclude(
						is_active=False).exclude(
						is_superuser=True).exclude(
						is_staff=True).filter(
						cursos=cur_id)
			else:
				kwargs['queryset'] = Usuarios.objects.none()
		return super(PagoCuotaInline, self).formfield_for_foreignkey(db_field, request, **kwargs)

	def get_formset(self, request, obj=None, **kwargs):
			formset = super(PagoCuotaInline, self).get_formset(request, obj, **kwargs)
			form = formset.form
			widget = form.base_fields['usuario'].widget
			widget.can_add_related = False
			widget.can_change_related = False
			return formset

    
class AsistenciaInline(admin.TabularInline):
	model = Asistencia
	extra = 1
	fields = ('curso','usuario','asistio','fecha',)
	
	def formfield_for_foreignkey(self, db_field, request, **kwargs):
		if db_field.name == 'usuario':
			cur_id = request.resolver_match.kwargs.get('object_id', None)
			if cur_id:
				kwargs['queryset'] = Usuarios.objects.exclude(
						is_active=False).exclude(
						is_superuser=True).exclude(
						is_staff=True).filter(cursos=cur_id)
			else:
				kwargs['queryset'] = Usuarios.objects.none()
		return super(AsistenciaInline, self).formfield_for_foreignkey(db_field, request, **kwargs)
	
	def get_formset(self, request, obj=None, **kwargs):
			formset = super(AsistenciaInline, self).get_formset(request, obj, **kwargs)
			form = formset.form
			widget = form.base_fields['usuario'].widget
			widget.can_add_related = False
			widget.can_change_related = False
			return formset
    
    
class CursoHorarioInline(admin.TabularInline):
	model = CursoHorario
	extra = 1
	fields = ('horario','cupo','dia',)

	def get_formset(self, request, obj=None, **kwargs):
		formset = super(CursoHorarioInline, self).get_formset(request, obj, **kwargs)
		form = formset.form
		widget = form.base_fields['horario'].widget
		widget.can_add_related = False
		widget.can_change_related = False
		return formset


class ReservasUsuariosInline(admin.TabularInline):
	model = ReservaUsuario
	extra = 1
	fields =('usuario',)

	def formfield_for_foreignkey(self, db_field, request, **kwargs):
		if db_field.name == 'usuario':
			cursohorario_id = request.resolver_match.kwargs.get('object_id', None)
			if cursohorario_id:
				kwargs['queryset'] = Usuarios.objects.exclude(
					is_active=False).exclude(
					is_superuser=True).exclude(
					is_staff=True).filter(
					cursos__cursohorario=cursohorario_id)
			else:
					kwargs['queryset'] = Usuarios.objects.none()
		return super(ReservasUsuariosInline, self).formfield_for_foreignkey(db_field, request, **kwargs)
    
    
@admin.register(Curso)
class CursoAdmin(admin.ModelAdmin):
	list_display = ['nombre', 'costo']
	filter_horizontal = ('usuarios',)
	ordering = ['nombre']
	inlines = (CursoHorarioInline,PagoCuotaInline,AsistenciaInline)
	readonly_fields = ('ingresos','lista_de_ingresos_mensuales')

	def lista_de_ingresos_mensuales(self, obj):
		ingresos = obj.ingresos_mensuales
		if ingresos:
			return format_html_join(
			'\n', "<li>{}/{}: Ingresos: ${}</li>",
			((ingreso['year'], ingreso['month'], ingreso['cant']) for ingreso in ingresos))
		return '-'

	def formfield_for_manytomany(self, db_field, request, **kwargs):
		if db_field.name == "usuarios":
			kwargs["queryset"] = Usuarios.objects.exclude(
					is_superuser=True).exclude(
					is_active=False).exclude(
					is_staff=True)
		return super().formfield_for_manytomany(db_field, request, **kwargs)
	
	def render_change_form(self, request, context, add=False, change=False, form_url='', obj=None):
			context.update({
					'show_save_and_continue': False,
					'show_save_and_add_another': False 
			})
			return super().render_change_form(request, context, add, change, form_url, obj)

    
@admin.register(CursoHorario)
class CursoHorarioAdmin(admin.ModelAdmin):
	model = CursoHorario
	list_display = ('curso','dia','horario', 'cupo', )
	inlines = [
			ReservasUsuariosInline
	]
	list_filter = ('dia','curso','horario')
	ordering = ('curso','dia')
	search_fields = ('dia',)
	
	
	def get_form(self, request, obj=None, **kwargs):  
			form = super(CursoHorarioAdmin, self).get_form(request, obj, **kwargs)
			form.base_fields['curso'].widget.can_add_related = False
			form.base_fields['curso'].widget.can_change_related = False
			form.base_fields['horario'].widget.can_change_related = False
			return form
	
	def render_change_form(self, request, context, add=False, change=False, form_url='', obj=None):
			context.update({
				'show_save_and_add_another': False 
		})
			return super().render_change_form(request, context, add, change, form_url, obj)
	
    

@admin.register(PagoCuota)
class PagoCuotaAdmin(admin.ModelAdmin):
	model = PagoCuota
	fields = ('curso','usuario','dia_de_pago','recargo')
	list_filter = ('curso','usuario','recargo')
	list_per_page= 30

	def get_form(self, request, obj=None, **kwargs):  
		form = super(PagoCuotaAdmin, self).get_form(request, obj, **kwargs)
		form.base_fields['usuario'].widget.can_add_related = False
		form.base_fields['usuario'].widget.can_change_related = False
		form.base_fields['usuario'].queryset = Usuarios.objects.exclude(
		is_superuser=True).exclude(
		is_active=False).exclude(
		is_staff=True)
		form.base_fields['curso'].widget.can_add_related = False
		form.base_fields['curso'].widget.can_change_related = False
		return form
	
	def render_change_form(self, request, context, add=False, change=False, form_url='', obj=None):
			context.update({
				'show_save_and_add_another': False 
		})
			return super().render_change_form(request, context, add, change, form_url, obj)
	

@admin.register(Asistencia)
class AsistenciaAdmin(admin.ModelAdmin):
	model = Asistencia
	fields = ('curso','usuario','asistio','fecha')
	list_filter = ('curso','usuario','asistio','fecha')
	list_per_page= 30

	def get_form(self, request, obj=None, **kwargs):    # Just added this override
		form = super(AsistenciaAdmin, self).get_form(request, obj, **kwargs)
		form.base_fields['usuario'].widget.can_add_related = False
		form.base_fields['usuario'].widget.can_change_related = False
		form.base_fields['usuario'].queryset = Usuarios.objects.exclude(
		is_superuser=True).exclude(
		is_active=False).exclude(
		is_staff=True)
		form.base_fields['curso'].widget.can_add_related = False
		form.base_fields['curso'].widget.can_change_related = False
		return form
	
	def render_change_form(self, request, context, add=False, change=False, form_url='', obj=None):
			context.update({
				'show_save_and_continue': False,		
		})
			return super().render_change_form(request, context, add, change, form_url, obj)	

admin.site.site_header = 'Administracion Sparta Gym'
admin.site.index_title = 'Panel de control Sparta'


admin.site.unregister(Group)
admin.site.register(Horario)






