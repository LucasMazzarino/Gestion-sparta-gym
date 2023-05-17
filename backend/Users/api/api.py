from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import viewsets
from django.db.models import Count, Q
from rest_framework.response import Response
from rest_framework.generics import DestroyAPIView
import datetime
from Users.models import Usuarios, ReservaUsuario
from Cursos.models import PagoCuota
from Users.api.serializers import UsuariosSerializer, UsuariosPartialSerializer,ReservaUsuariosSerializer,CrearReservaUsuarioSerializer,ListaReservasUsuariosSerializer,ListaPagosUsuariosSerializer

class UsuariosViewSet(viewsets.ViewSet):
  
	
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
	queryset = ReservaUsuario.objects.all()

	def get_serializer_class(self):
		if self.action == 'list':
				return ReservaUsuariosSerializer
		return CrearReservaUsuarioSerializer
	
	def destroy(self, request, *args, **kwargs):
		instance = self.get_object()
		self.perform_destroy(instance)
		instance.curso_horario.cupo + 1
		instance.curso_horario.save()
		return Response({'status' : 'Reserva Eliminada'})
	


	@action(detail=True, methods=['post'])
	def reservar_cupo(self, request, pk=None):
		if self.action == 'create':
			user = self.request.user
			serializer = ReservaUsuariosSerializer(data=request.data)
			if serializer.is_valid():
				ReservaUsuario.curso_horario.cupo - 1
				return Response({'status': 'reserva agregada'})
			else:
				return Response(serializer.errors,
					status=status.HTTP_400_BAD_REQUEST)
	
	

class ListaReservasUsuariosViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Usuarios.objects.all()
	serializer_class = ListaReservasUsuariosSerializer

class ListaPagosUsuariosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Usuarios.objects.exclude(
        is_active=False).exclude(
        is_superuser=True).exclude(
        is_staff=True)
    serializer_class = ListaPagosUsuariosSerializer

    def list(self, request):
        queryset = self.queryset.annotate(pagos_realizados=Count('pagocuota', filter=Q(pagocuota__dia_de_pago__lt=datetime.date.today()))).annotate(pagos_pendientes=Count('pagocuota', filter=Q(pagocuota__dia_de_pago__gte=datetime.date.today())))
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

