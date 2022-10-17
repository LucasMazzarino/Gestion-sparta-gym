import{
  GET_RESERVA_HORARIO_SUCCESS,
  GET_RESERVA_HORARIO_FAIL,
  RESERVA_HORARIO_FAIL,
  RESERVA_HORARIO_SUCCESS,
  ELIMINAR_RESERVA_FAIL,
  ELIMINAR_RESERVA_SUCCESS
}from '../actions/types'


const initialState = {
 
  reservas:null
}

export default function Reservas(state = initialState, action){
  const {type, payload} = action;

  switch(type) {
    case GET_RESERVA_HORARIO_SUCCESS:
      return {
        ...state,
  
        reservas: payload.reservas
      }
    case GET_RESERVA_HORARIO_FAIL:
      return {
        ...state,
        reservas: null
      }
    case RESERVA_HORARIO_FAIL:
    case RESERVA_HORARIO_SUCCESS:
    case ELIMINAR_RESERVA_FAIL:
    case ELIMINAR_RESERVA_SUCCESS:
      return {
        ...state,
      }
    default:
      return state

  }
}
