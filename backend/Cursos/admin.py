from django.contrib import admin


from .models import Horario, Cursos
from Users.models import Usuarios


class UsuarioInline(admin.TabularInline):
    model = Usuarios
    max_num = 1
    extra = 1
    fields = ('nombre','apellido','pago_cuota')
    readonly_fields = ('nombre','apellido')

@admin.register(Cursos)
class CursoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'costo')
    ordering = ['nombre']
    radio_fields = {"horario": admin.VERTICAL}
    inlines = [
        UsuarioInline,
    ]
    readonly_fields = ('ganancia',)
    

admin.site.register(Horario)
