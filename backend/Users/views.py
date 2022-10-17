# from django.contrib.auth import authenticate

# from rest_framework import status
# from rest_framework.generics import GenericAPIView
# from rest_framework.response import Response

# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.views import TokenObtainPairView

# from Users.api.serializers import (
#     CustomTokenObtainPairSerializer, UsuariosSerializer
# )

# from Users.models import Usuarios


# class Login(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer

#     def post(self, request, *args, **kwargs):
#         documento = request.data.get('documento', '')
#         password = request.data.get('password', '')
#         user = authenticate(
#             documento=documento,
#             password=password
#         )

#         if user:
#             login_serializer = self.serializer_class(data=request.data)
#             if login_serializer.is_valid():
#                 user_serializer = UsuariosSerializer(user)
#                 return Response({
#                     'token': login_serializer.validated_data.get('access'),
#                     'refresh-token': login_serializer.validated_data.get('refresh'),
#                     'user': user_serializer.data,
#                     'message': 'Inicio de Sesion Existoso'
#                 }, status=status.HTTP_200_OK)
#             return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)

# class Logout(GenericAPIView):
# 	def post(self, request,*args,**kwargs):
# 		user = Usuarios.objects.filter(id=request.data.get('user', 0))
# 		if user.exists():
# 			RefreshToken.for_user(user.first())
# 			return Response({'mensaje': 'Sesion cerrada correctamente'}, status=status.HTTP_200_OK)
# 		return Response({'error': 'No existe este usaurio'}, status=status.HTTP_400_BAD_REQUEST)

