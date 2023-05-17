import {
	GET_PAGOS_SUCCESS,
	GET_PAGOS_FAIL
} from '../actions/types';


const initialState = {
    pagos: null,
}

export default function Pagos(state = initialState, action) {
  const {type, payload} = action;

	switch (type) {
		case GET_PAGOS_SUCCESS:
			return{
				...state,
				pagos: payload
			}
		case GET_PAGOS_FAIL:
			return{
				...state,
				ingrpagossos:null
			}
		default:
			return state	
	}
}