from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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
      usuarios = get_object_or_404(Usuarios,id=usuarios)
      serializer = UsuariosSerializer(usuarios)
      return Response({'usuarios':serializer.data}, status=status.HTTP_200_OK)

