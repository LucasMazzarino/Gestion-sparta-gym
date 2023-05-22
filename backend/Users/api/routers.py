from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from Users.api.api import UsuariosViewSet, ReservaUsuariosViewset, ListaReservasUsuariosViewSet,ListaPagosUsuariosViewSet

router = DefaultRouter()

router.register('verusuarios',UsuariosViewSet, basename="users")
router.register('reservas',ReservaUsuariosViewset, basename="reserva")
router.register('listar_reservas',ListaReservasUsuariosViewSet, basename="listar")
router.register('listar_pagos',ListaPagosUsuariosViewSet, basename="listarPagos")

urlpatterns = router.urls