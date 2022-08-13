from msilib.schema import AppId
import re
from django.contrib.sessions.models import Session

from datetime import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from Users.api.serializers import UsuarioTokenserializer

from Users.api.serializers import UsuariosSerializer

class Login(ObtainAuthToken):

	def post(self,request,*args,**kwargs):
		login_serializer = self.serializer_class(data = request.data, context = {'request':request})
		if login_serializer.is_valid():
			user = login_serializer.validated_data['user']
			if user.is_active:
				token,created = Token.objects.get_or_create(user = user)
				user_serialzier = UsuarioTokenserializer(user)
				if created:
					return Response({
						'token':token.key,
						'user': user_serialzier.data,
						'mensaje':'Inicio de sesion exitoso'
					}, status = status.HTTP_201_CREATED)
				else:
					todas_las_sessiones = Session.objects.filter(expire_date__gte = datetime.now())
					if todas_las_sessiones.exists():
						for session in todas_las_sessiones:
							session_data = session.get_decoded()
							if user.id == int(session_data.get('_auth_user_id')):
								session.delete()
					token.delete()
					token = Token.objects.create(user = user)
					return Response({
						'token':token.key,
						'user': user_serialzier.data,
						'mensaje':'Inicio de sesion exitoso'
					}, status = status.HTTP_201_CREATED)
			else:
				return Response({'error':'Este usuario no puede inicar sesion'},
				status = status.HTTP_401_UNAUTHORIZED)
		else:
			return Response({'error':'Nombre de usuario o contraseña incorrectos'},
			status = status.HTTP_400_BAD_REQUEST)
		return Response({'mensaje':'hola desde response'}, status = status.HTTP_200_OK)


class Logout(APIView):

	def get(sel,request,*args,**kwargs):
		try:
			token = Token.objects.filter(key = request.GET.get('token')).first()
			if token:
				user = token.user
				todas_las_sessiones = Session.objects.filter(expire_date__gte = datetime.now())
				if todas_las_sessiones.exists():
					for session in todas_las_sessiones:
						session_data = session.get_decoded()
						if user.id == int(session_data.get('_auth_user_id')):
							session.delete()
				token.delete()
				
				session_message = 'Sesiones de usaurio eliminadas.'
				token_message =  'Token eliminado.'
				return Response({'token_message':token_message, 'session_message':session_message}, status = status.HTTP_200_OK)
			return Response({'error':'No se encontro usuario'}, status = status.HTTP_400_BAD_REQUEST)
		except:
			return Response({'error':'No se a encontrado token en la peticion'}, status = status.HTTP_409_CONFLICT)
 