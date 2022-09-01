from rest_framework.routers import DefaultRouter
from Cursos.api.viewsets.horario_view import HorariosViewSet
from Cursos.api.viewsets.cursoviewset import CursoViewSet 

router = DefaultRouter()

router.register('horarios',HorariosViewSet, basename='horario')
router.register('', CursoViewSet, basename='cursos')

urlpatterns = router.urls