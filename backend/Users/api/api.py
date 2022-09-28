from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import viewsets

from Users.models import Usuarios, ReservaUsuarios
from Users.api.serializers import UsuariosSerializer, UsuariosPartialSerializer,ReservaUsuariosSerializer

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

class ReservaUsuariosViewset(viewsets.ModelViewSet):
	queryset = ReservaUsuarios.objects.all()
	serializer_class = ReservaUsuariosSerializer

	@action(detail=True, methods=['post'])
	def reservar_cupo(self, request, pk=None):
		user = self.request.user
		serializer = ReservaUsuariosSerializer(data=request.data)
		if serializer.is_valid():
			ReservaUsuarios.curso_horario.cupo -1
			return Response({'status': 'reserva agregada'})
		else:
			return Response(serializer.errors,
											status=status.HTTP_400_BAD_REQUEST)
	

