import axios from 'axios';
import {
	GET_INGRESOS_SUCCESS,
	GET_INGRESOS_FAIL
} from './types';

export const get_ingresos = () => async dispatch => {
	const config = {
		Headers: {
			'accept': 'application/json'
		}
	};

	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/cursos/ingresos`, config);

		if (res.status === 200) {
			dispatch({
				type: GET_INGRESOS_SUCCESS,
				payload: res.data
			});
		} else {
			dispatch({
				type: GET_INGRESOS_FAIL
			});
		}
	} catch (err) {
		dispatch({
			type: GET_INGRESOS_FAIL
		});
	}
}