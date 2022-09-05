from django.contrib import admin


from .models import Horario, Cursos, CursoHorario
from Users.models import Usuarios
from Cursos.models import AsistenciaCursoUsuario


class AsistenciaCursoUsuarioInline(admin.TabularInline):
    model = AsistenciaCursoUsuario
    extra = 0
    
    #exclude = ('usuario',)
    #list_display = ('get_usuarios_curso',)
    fields = ('usuario','asistencia',)
    readonly_fields = ('usuario',)

    def get_pago_cuota(self, obj):
        return obj.usuario.pago_cuota
    

class CursoHorarioInline(admin.TabularInline):
    model = CursoHorario
    extra = 1
    fields = ('horario','cupo','dia',)
    # inlines = [
    #     AsistenciaCursoUsuarioInline
    # ]

@admin.register(Cursos)
class CursoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'costo')
    filter_horizontal = ('usuarios',)
    ordering = ['nombre']
    inlines = (CursoHorarioInline,)
    readonly_fields = ('ganancia',)

@admin.register(CursoHorario)
class CursoHorarioAdmin(admin.ModelAdmin):
    model = CursoHorario
    list_display = ('curso','horario', 'cupo', )
    inlines = [AsistenciaCursoUsuarioInline,]


# class CursoInline(admin.TabularInline):
#     model = Cursos
#     extra =1
#     exclude = ('nombre','costo','descripcion','state','horario')

    

admin.site.register(Horario)


