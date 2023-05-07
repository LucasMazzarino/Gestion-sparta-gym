import axios from 'axios';
import {
	GET_PAGOS_SUCCESS,
	GET_PAGOS_FAIL
} from './types';

export const get_pagos = () => async dispatch => {
	const config = {
		Headers: {
			'accept': 'application/json'
		}
	};

	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios/listar_pagos/`, config);

		if (res.status === 200) {
			dispatch({
				type: GET_PAGOS_SUCCESS,
				payload: res.data
			});
		} else {
			dispatch({
				type: GET_PAGOS_FAIL
			});
		}
	} catch (err) {
		dispatch({
			type: GET_PAGOS_FAIL
		});
	}
}