import axios from 'axios';
import {
	GET_NOTICIAS_SUCCESS,
	GET_NOTICIAS_FAIL
} from './types';

export const get_noticias = () => async dispatch => {
	const config = {
		Headers: {
			'accept': 'application/json'
		}
	};

	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/noticias`, config);

		if (res.status === 200) {
			dispatch({
				type: GET_NOTICIAS_SUCCESS,
				payload: res.data
			});
		} else {
			dispatch({
				type: GET_NOTICIAS_FAIL
			});
		}
	} catch (err) {
		dispatch({
			type: GET_NOTICIAS_FAIL
		});
	}
}