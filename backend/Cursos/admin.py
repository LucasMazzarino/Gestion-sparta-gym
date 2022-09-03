from django.contrib import admin


from .models import Horario, Cursos, CursoHorario
from Users.models import Usuarios
from Cursos.models import AsistenciaCursoUsuario


class UsuarioInline(admin.TabularInline):
    model = AsistenciaCursoUsuario
    max_num = 1
    extra = 1
    list_display = ('get_usuarios',)
    #fields = ('nombre','apellido','pago_cuota')
    # readonly_fields = ('nombre','apellido')

class CursoHorarioInline(admin.TabularInline):
    model = CursoHorario
    extra = 1
    fields = ('horario','cupo','dia',)
    inlines = [
         UsuarioInline,
    ]

@admin.register(Cursos)
class CursoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'costo')
    filter_horizontal = ('usuarios',)
    ordering = ['nombre']
    inlines = (CursoHorarioInline,)
    #fliter_horizontal = ('horarios')
    readonly_fields = ('ganancia',)

@admin.register(CursoHorario)
class CursoHorarioAdmin(admin.ModelAdmin):
     list_display = ('curso','horario', 'cupo')
     inlines = [UsuarioInline,]

    

admin.site.register(Horario)


