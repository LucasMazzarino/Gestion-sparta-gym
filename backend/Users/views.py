from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import Usuarios
from .serializers import UsuariosSerializer


class UsuariosViewSet(viewsets.ViewSet):

  def list(self, request):
    queryset = Usuarios.objects.all()
    serializer = UsuariosSerializer(queryset, many=True)
    return Response(serializer.data)

  def retrieve(self, request, pk=None):
    queryset = Usuarios.objects.all()
    usuario = get_object_or_404(queryset, pk=pk)
    serializer = UsuariosSerializer(usuario)
    return Response(serializer.data)
    









