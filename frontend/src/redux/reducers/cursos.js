import{
  GET_CURSOS_SUCCESS,
  GET_CURSOS_FAIL,
  GET_CURSO_SUCCESS,
  GET_CURSO_FAIL
}from '../actions/types';

const initialState = {
  cursos: null,
  curso: null,
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
    case GET_CURSO_SUCCESS:
      return {
          ...state,
          curso: payload
        }
    case GET_CURSO_FAIL:
        return {
            ...state,
            curso: null
        }
    default:
      return state
  }
}