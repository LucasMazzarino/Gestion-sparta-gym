import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

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
import Error404 from './containers/errors/Error404';  
import Estadisticas from './containers/paginas/Estadisticas';

import { connect } from 'react-redux';



const App = ({
  
}) =>{
  return ( 
      <Router>
        <Routes>
          <Route path="*" element={<Error404/>}/>

          <Route index element={<Inicio/>}/>
          <Route path='/Cursos' element={<Cursos/>}/>
          <Route path='/Noticias' element={<Noticias/>}/>
          <Route path='/Contacto' element={<Contacto/>}/>
          <Route path='/Galeria' element={<Galeria/>}/>

          {/*autenticacion */}
          <Route exact path='/reset_password' element={<ResetPassword/>} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ConfirmResetPassword/>} />

          {/*detalle Curso */}
          <Route exact path='/cursos/:cursoId' element={<CursoDetail/>} /> 

          {/*reserva de horario */}
          <Route exact path='/reservas' element={<ReservaHorario/>}></Route>
          {/*graficos*/}
          <Route exact path='/estadisticas' element={<Estadisticas/>}></Route>
        </Routes>
      </Router>      
  );
}

const mapStateToProps = state => ({
  
})

export default connect(mapStateToProps,{

}) (App)
