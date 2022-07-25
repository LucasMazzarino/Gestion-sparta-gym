from django.urls import path
from .views import ListaUsuariosView

app_name='users'

urlpatterns = [
    path('usuarios/', ListaUsuariosView.as_view()),
]