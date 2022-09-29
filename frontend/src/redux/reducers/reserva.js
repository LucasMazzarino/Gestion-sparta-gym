import{
  GET_RESERVA_HORARIO_SUCCESS,
  GET_RESERVA_HORARIO_FAIL,
  RESERVA_HORARIO_FAIL,
  RESERVA_HORARIO_SUCCESS,
}from '../actions/types'


const initialState = {
  reservas : null,
}

export default function Reservas(state = initialState, action){
  const {type, payload} = action;

  switch(type) {
    case GET_RESERVA_HORARIO_SUCCESS:
      return {
        ...state,
        reservas: payload
      }
    case GET_RESERVA_HORARIO_FAIL:
      return {
        ...state,
        reservas: null
      }
    case RESERVA_HORARIO_FAIL:
    case RESERVA_HORARIO_SUCCESS:
      return {
        ...state,
      }
    default:
      return state

  }
}
