import { combineReducers  } from "redux";
import Auth from "./auth";
import Alerta from './alert';
import Cursos from './cursos';
import Noticias from './noticias';
import Reservas from "./reserva";

export default combineReducers({
  Auth,
  Alerta,
  Cursos,
  Noticias,
  Reservas,
})