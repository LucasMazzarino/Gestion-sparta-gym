from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from Users.api.api import UsuariosViewSet, ReservaUsuariosViewset

router = DefaultRouter()

router.register('verusuarios',UsuariosViewSet, basename="users")
router.register('reservas',ReservaUsuariosViewset, basename="reserva")


urlpatterns = router.urls