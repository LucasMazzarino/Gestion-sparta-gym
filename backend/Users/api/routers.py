from rest_framework.routers import DefaultRouter

from Users.api.api import UsuariosViewSet

router = DefaultRouter()

router.register('',UsuariosViewSet, basename="users")

urlpatterns = router.urls