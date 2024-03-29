from django.urls import path, include,re_path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic import TemplateView

from rest_framework_simplejwt.views import (
     TokenObtainPairView,
     TokenRefreshView,
 )

urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html"),name="index"),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('admin/', admin.site.urls),
    path('usuarios/',include('Users.api.routers',)),
    path('cursos/',include('Cursos.api.routers',)),
    path('noticias/',include('Noticias.api.routers',)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += [
        re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    ]
