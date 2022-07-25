from django.shortcuts import get_object_or_404 ,render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Usuarios
from .serializers import UsuariosSerializer

class ListaUsuariosView(APIView):
  def get(self, request, *args, **kwargs):
      usuarios = Usuarios.posteoobjetos.all()
      serializer = UsuariosSerializer(usuarios,many=True)

      return Response(serializer.data)
    

# class UsuariosDetalleView(APIView):
#   def get(self, request, post_slug,*args,**kwargs):
#     usu = get_object_or_404(Usuarios,)
#     serializer = UsuariosSerializer(usu)
#     return Response(serializer.data)