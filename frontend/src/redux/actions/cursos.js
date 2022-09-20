import axios from 'axios';
import{
  GET_CURSOS_SUCCESS,
  GET_CURSOS_FAIL,
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