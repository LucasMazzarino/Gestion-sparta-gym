import { combineReducers  } from "redux";
import Auth from "./auth";
import Alerta from './alert';
import Cursos from './cursos';

export default combineReducers({
  Auth,
  Alerta,
  Cursos,
})