import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Inicio from './containers/paginas/Inicio';
import Cursos from './containers/paginas/Cursos';
import Noticias from './containers/paginas/Noticias';
import Contacto from './containers/paginas/Contacto';
import Galeria from './containers/paginas/Galeria';
import CursoDetail from './containers/paginas/CursosDetail';
import ReservaHorario from './containers/paginas/ReservaHorario';
import ResetPassword from './containers/auth/ResetPassword';
import ConfirmResetPassword from './containers/auth/ConfirmResetPassword';
import Error404 from './containers/errors/Error404';  
import Estadisticas from './containers/paginas/Estadisticas';
import RutasProtegidas from './components/RutaProtegida';
import RutaPublica from './components/RutaPublica';



const App = () => {
  return ( 
      <Router>
        <Routes>
          <Route path="*" element={<Error404/>}/>

          <Route index element={<Inicio/>}/>
          <Route path='/Cursos' element={<Cursos/>}/>
          <Route path='/Noticias' element={<Noticias/>}/>
          <Route path='/Contacto' element={<Contacto/>}/>
          <Route path='/Galeria' element={<Galeria/>}/>
          <Route exact path='/cursos/:cursoId' element={<CursoDetail/>}/> 
          {/*detalle Curso */}
          <Route element={<RutaPublica/>}>
            <Route exact path='/reset_password' element={<ResetPassword/>} />
          </Route>     
          {/*Rutas protegidas*/}
          {/*reserva de horario */}
          {/*graficos*/}
          {/*autenticacion */}
          <Route element={<RutasProtegidas/>}>
            <Route exact path='/reservas' element={<ReservaHorario/>}/>
            <Route exact path='/estadisticas' element={<Estadisticas/>}/>          
          </Route>
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ConfirmResetPassword/>} />
      </Routes>
      </Router>      
  );
}

export default App;
