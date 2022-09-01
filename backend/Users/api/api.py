from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import viewsets

from Users.models import Usuarios
from Users.api.serializers import UsuariosSerializer

class UsuariosViewSet(viewsets.ViewSet):
  
	permission_classes = (IsAuthenticated,)
	def list(self, request):
		queryset = Usuarios.objects.all()
		serializer = UsuariosSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, pk=None):
		queryset = Usuarios.objects.all()
		usuario = get_object_or_404(queryset, pk=pk)
		serializer = UsuariosSerializer(usuario)
		return Response(serializer.data,status = status.HTTP_200_OK)