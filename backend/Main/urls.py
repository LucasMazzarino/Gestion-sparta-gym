from django.urls import path, include,re_path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
    
from Users.views import Login,Logout

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuarios/',include('Users.api.routers',)),
    path('',Login.as_view(), name = 'login'),
    path('logout/', Logout.as_view(), name = 'logout'),
]

# urlpatterns += [
#     re_path(r'^media/(?P<path>.*)$', serve, {
#         'document_root': settings.MEDIA_ROOT,
#     }),
# ]


