from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

from django.utils import timezone
from django.conf import settings

from datetime import timedelta

# class ExpiracionTokenAutenticacion(TokenAuthentication):
#     def expires_in(self,token):
#       tiempo_pasado = timezone.now() - token.created
#       queda_tiempo = timedelta(seconds = settings.TOKEN_EXPIRED_AFTER_SECODNS)

#     def is_token_expired(token):
#       return self.expires_in(token) < timedelta(seconds = 0)

#     def token_expire_handler(self,token):
#        is_expired = self.is_token_expired(token)
#        if is_expired:
#           print("Token expirado")
    
#     def authenticate_credentials(self, key):
#       try:
#         token = self.get_model().objects.select_related('user').get(key =key )
#       except self.get_model().DoesNotExist:
#         raise AuthenticationFailed('Token invalido')
#       if not token.user.is_active:
#         raise AuthenticationFailed('Usuario eliminado o on esta activo')
      
#       is_expired = token_expire_handler(token)
#       if is_expired:
#         raise AuthenticationFailed('Su token expiro')
#       return (token.user,token)
       
