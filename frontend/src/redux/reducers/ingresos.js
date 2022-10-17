import {
	GET_INGRESOS_SUCCESS,
	GET_INGRESOS_FAIL
} from '../actions/types';


const initialState = {
    ingresos: null,
}

export default function Ingresos(state = initialState, action) {
  const {type, payload} = action;

	switch (type) {
		case GET_INGRESOS_SUCCESS:
			return{
				...state,
				ingresos: payload
			}
		case GET_INGRESOS_FAIL:
			return{
				...state,
				ingresos:null
			}
		default:
			return state	
	}
}