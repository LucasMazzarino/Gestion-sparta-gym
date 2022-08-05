from django.urls import path
from .views import ListaUsuariosView, UsuariosDetalleView

app_name='users'

urlpatterns = [
    path('usuarios/', ListaUsuariosView.as_view()),
    #path('usuaros_id:<id>',UsuariosDetalleView.as_view()),
]