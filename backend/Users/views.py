from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Usuarios
from .serializers import UsuariosSerializer


class ListaUsuariosView(APIView):
  def get(self, request, *args, **kwargs):
    if Usuarios.postobjects.all().exists():

      usuarios = Usuarios.postobjects.all()
      serializer = UsuariosSerializer(usuarios,many=True)

      return Response(serializer.data)
    

class UsuariosDetalleView(APIView):
   def get(self, request, post_slug,*args,**kwargs):
      usuarios = get_object_or_404(Usuarios,)
      serializer = UsuariosSerializer(usu)
      return Response(serializer.data)

