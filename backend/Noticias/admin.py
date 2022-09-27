from django.contrib import admin

from Noticias.models import Noticia
from Users.models import Usuarios


@admin.register(Noticia)
class NoticiaAdmin(admin.ModelAdmin):
  model = Noticia
  list_display = ('titulo','slug','autor','status','publicado')
  list_filter = ('publicado','autor','status')
  ordering =['publicado']
  
  def get_form(self, request, obj=None, **kwargs):    
    form = super(NoticiaAdmin, self).get_form(request, obj, **kwargs)
    form.base_fields['autor'].widget.can_add_related = False
    form.base_fields['autor'].widget.can_change_related = False

    return form


  def formfield_for_foreignkey(self, db_field, request, **kwargs):
    if db_field.name == "autor":
      kwargs["queryset"] = Usuarios.objects.filter(is_superuser= True)
    return super(NoticiaAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)


