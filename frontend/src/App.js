import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Inicio from './containers/paginas/Inicio';
import Cursos from './containers/paginas/Cursos';
import Noticias from './containers/paginas/Noticias';
import Contacto from './containers/paginas/Contacto';
import Galeria from './containers/paginas/Galeria';
import CursoDetail from './containers/paginas/CursosDetail';
import ReservaHorario from './containers/paginas/ReservaHorario';

import Login from './containers/auth/Login';
import ResetPassword from './containers/auth/ResetPassword';
import ConfirmResetPassword from './containers/auth/ConfirmResetPassword';



function App() {
  return ( 
      <Router>
        <Routes>
           <Route index element={<Inicio/>}/>
           <Route path='/Cursos' element={<Cursos/>}/>
           <Route path='/Noticias' element={<Noticias/>}/>
           <Route path='/Contacto' element={<Contacto/>}/>
           <Route path='/Galeria' element={<Galeria/>}/>

           {/*autenticacion */}
           <Route exact path='/login' element={<Login/>} />
           <Route exact path='/reset_password' element={<ResetPassword/>} />
           <Route exact path='/password/reset/confirm/:uid/:token' element={<ConfirmResetPassword/>} />

           {/*detalle Curso */}
           <Route exact path='/cursos/:cursoId' element={<CursoDetail/>} /> 

           {/*reserva de horario */}
           <Route exact path='/reservas' element={<ReservaHorario/>}></Route>
        </Routes>
      </Router>      
  );
}

export default App;
