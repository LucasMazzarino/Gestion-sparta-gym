from rest_framework.routers import DefaultRouter
from Noticias.api.api import NoticiaViewSet

router = DefaultRouter()

router.register('noticias',NoticiaViewSet, basename='noticia')

urlpatterns = router.urls