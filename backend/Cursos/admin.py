from django.contrib import admin
from django.contrib.auth.models import Group


from .models import Horario, Cursos, CursoHorario, PagoCuota, Asistencia
from Users.models import Usuarios

class PagoCuotaInline(admin.TabularInline):
    model = PagoCuota
    fields = ('usuario','dia_de_pago',)
    extra = 1
    list_filter = ('dia_de_pago',)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
            if db_field.name == 'usuario':
                cur_id = request.resolver_match.kwargs.get('object_id', None)
                if cur_id:
                    kwargs['queryset'] = Usuarios.objects.filter(cursos=cur_id)
                else:
                    kwargs['queryset'] = Usuarios.objects.none()
            return super(PagoCuotaInline, self).formfield_for_foreignkey(db_field, request, **kwargs)

    
class AsistenciaInline(admin.TabularInline):
    model = Asistencia
    extra = 1
    fields = ('curso','usuario','asistio','fecha',)
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
            if db_field.name == 'usuario':
                cur_id = request.resolver_match.kwargs.get('object_id', None)
                if cur_id:
                    kwargs['queryset'] = Usuarios.objects.filter(cursos=cur_id)
                else:
                    kwargs['queryset'] = Usuarios.objects.none()
            return super(AsistenciaInline, self).formfield_for_foreignkey(db_field, request, **kwargs)

    

class CursoHorarioInline(admin.TabularInline):
    model = CursoHorario
    extra = 1
    fields = ('horario','cupo','dia',)

    
@admin.register(Cursos)
class CursoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'costo',)
    filter_horizontal = ('usuarios',)
    ordering = ['nombre']
    inlines = (CursoHorarioInline,PagoCuotaInline,AsistenciaInline)
    readonly_fields = ('ganancia',)

    

@admin.register(CursoHorario)
class CursoHorarioAdmin(admin.ModelAdmin):
    model = CursoHorario
    list_display = ('curso','dia','horario', 'cupo', )
    list_filter = ('dia','curso','horario')
    ordering = ('curso','dia')
    search_fields = ('dia',)


@admin.register(PagoCuota)
class PagoCuotaAdmin(admin.ModelAdmin):
    model = PagoCuota
    fields = ('curso','usuario','dia_de_pago')
    list_filter = ('dia_de_pago','usuario','curso')


@admin.register(Asistencia)
class AsistenciaAdmin(admin.ModelAdmin):
    model = Asistencia
    fields = ('curso','usuario','asistio','fecha')
    list_filter = ('curso','usuario','asistio','fecha')



admin.site.site_header = 'Administracion Sparta Gym'
admin.site.index_title = 'Panel de control Sparta'


admin.site.unregister(Group)
admin.site.register(Horario)






