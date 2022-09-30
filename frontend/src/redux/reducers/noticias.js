import{
    GET_NOTICIAS_SUCCESS,
    GET_NOTICIAS_FAIL
  }from '../actions/types';

const initialState = {
    noticias: null,
}

export default function Noticias(state = initialState, action) {
  const {type, payload} = action;

	switch (type) {
		case GET_NOTICIAS_SUCCESS:
			return{
				...state,
				noticias: payload
			}
		case GET_NOTICIAS_FAIL:
			return{
				...state,
				noticias:null
			}
		default:
			return state	
	}
}