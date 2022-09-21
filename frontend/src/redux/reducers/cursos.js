import{
  GET_CURSOS_SUCCESS,
  GET_CURSOS_FAIL,
}from '../actions/types';

const initialState = {
  cursos: null
}

export default function Cursos(state = initialState, action){
  const {type, payload} = action;

  switch (type) {
    case GET_CURSOS_SUCCESS:
      return{
        ...state,
        cursos: payload
      }
    case GET_CURSOS_FAIL:
      return{
        ...state,
        cursos:null
      }
    default:
      return state
  }
}