import { combineReducers  } from "redux";
import Auth from "./auth";
import Alerta from './alert';

export default combineReducers({
  Auth,
  Alerta,
})