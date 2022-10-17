from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from Users.api.api import UsuariosViewSet, ReservaUsuariosViewset, ListaReservasUsuariosViewSet

router = DefaultRouter()

router.register('verusuarios',UsuariosViewSet, basename="users")
router.register('reservas',ReservaUsuariosViewset, basename="reserva")
router.register('listar_reservas',ListaReservasUsuariosViewSet, basename="listar")
# router.register('borrar_reserva',DeleteReservaUsuariosViewet, basename="borrar")



urlpatterns = router.urls