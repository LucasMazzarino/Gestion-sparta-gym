import { combineReducers  } from "redux";
import Auth from "./auth";
import Alerta from './alert';
import Cursos from './cursos';
import Noticias from './noticias';
import Reservas from "./reserva";
import Ingresos from "./ingresos";
import Pagos from "./pagos";

export default combineReducers({
  Auth,
  Alerta,
  Cursos,
  Noticias,
  Reservas,
  Ingresos,
  Pagos,
})