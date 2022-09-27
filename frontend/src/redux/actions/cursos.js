import axios from 'axios';
import{
  GET_CURSOS_SUCCESS,
  GET_CURSOS_FAIL,
  GET_CURSO_SUCCESS,
  GET_CURSO_FAIL
}from './types';

export const get_cursos = () => async dispatch => {
  const config = {
    headers:{
      'accept': 'application/json'
    }
  };
  
  try{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cursos`, config);

    if (res.status === 200){
      dispatch({
        type: GET_CURSOS_SUCCESS,
        payload: res.data
      });
    }else {
      dispatch({
        type: GET_CURSOS_FAIL
      });
    }
  }catch(err){
    dispatch({
      type: GET_CURSOS_FAIL
    });
  }
}

export const get_curso = (curso_id) => async dispatch => {
  const config = {
    headers:{
      'accept': 'application/json'
    }
  };
  
  try{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cursos/${curso_id}`, config);

    if (res.status === 200){
      dispatch({
        type: GET_CURSO_SUCCESS,
        payload: res.data
      });
    }else {
      dispatch({
        type: GET_CURSO_FAIL
      });
    }
  }catch(err){
    dispatch({
      type: GET_CURSO_FAIL
    });
  }
}