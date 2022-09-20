import{
  GET_CURSOS_EXITO,
  GET_CURSOS_FALLO,
}from '../actions/types';

const initialState = {
  cursos: null
}

export default function Cursos(state = initialState, action){
  const {type, payload} = action;

  switch (type) {
    case GET_CURSOS_EXITO:
      return{
        ...state,
        cursos: payload
      }
    case GET_CURSOS_FALLO:

    default:
      return state
  }
}