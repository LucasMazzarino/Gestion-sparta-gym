from django.urls import path, include,re_path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
    
# from Users.views import Login,Logout

from rest_framework_simplejwt.views import (
     TokenObtainPairView,
     TokenRefreshView,
 )

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # path('auth/', include('djoser.social.urls')),

    path('admin/', admin.site.urls),
    path('usuarios/',include('Users.api.routers',)),
    path('cursos/',include('Cursos.api.routers',)),
    path('noticias/',include('Noticias.api.routers',)),
    # path('login/',Login.as_view(), name = 'login'),
    # path('logout/', Logout.as_view(), name = 'logout'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
