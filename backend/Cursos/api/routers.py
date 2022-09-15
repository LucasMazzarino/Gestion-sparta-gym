from rest_framework.routers import DefaultRouter
from Cursos.api.viewsets.horario_view import HorariosViewSet
from Cursos.api.viewsets.cursoviewset import CursoViewSet 
from Cursos.api.viewsets.curso_horarioviewset import CursoHorarioViewSet

router = DefaultRouter()

router.register('cursohorarios',CursoHorarioViewSet, basename='horario')
router.register('horarios',HorariosViewSet, basename='horario')
router.register('', CursoViewSet, basename='cursos')

urlpatterns = router.urls