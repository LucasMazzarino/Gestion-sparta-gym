import {
	RESERVA_HORARIO_SUCCESS,
	RESERVA_HORARIO_FAIL,
	GET_RESERVA_HORARIO_SUCCESS,
	GET_RESERVA_HORARIO_FAIL,
	ELIMINAR_RESERVA_SUCCESS,
	ELIMINAR_RESERVA_FAIL
} from './types'
import { setAlert } from './alert';
import axios from 'axios'

export const reservar_horario = (usuario, curso_horario) => async dispatch => {

	const config = {
		Headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = {
		usuario,
		curso_horario
	};

	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/usuarios/reservas/`, body, config);
		
		if (res.status === 201) {
			dispatch({
				type: RESERVA_HORARIO_SUCCESS,
			});
			dispatch(setAlert('Reserva agregada con exito', 'success'));
		} else {
			dispatch({
				type: RESERVA_HORARIO_FAIL,
			});
			dispatch(setAlert(res.data.usuario[0], 'danger'));
		}
	}
	catch (err) {
		dispatch({
			type: RESERVA_HORARIO_FAIL
		});
		dispatch(setAlert(err.response.data.usuario, 'danger'));
	}

}

export const get_reservas_horarios = (usuario_id) => async (dispatch) => {

 	const config = {
 		Headers: {
 			'Content-Type': 'application/json'
 		}
 	};

 	try {
 		const res = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios/listar_reservas/${usuario_id}`, config);

 		if (res.status === 200) {
 			dispatch({
 				type: GET_RESERVA_HORARIO_SUCCESS,
				payload: res.data
 			});
 		} else {
 			dispatch({
 				type: GET_RESERVA_HORARIO_FAIL
 			});
 		}
 	}
 	catch (err) {
 		dispatch({
 			type: GET_RESERVA_HORARIO_FAIL
 		});
 	}

};

export const eliminar_reserva = (reserva_id) => async (dispatch) => {

	const config = {
		Headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.delete(`${process.env.REACT_APP_API_URL}/usuarios/reservas/${reserva_id}`, config);

		if (res.status === 200) {
			dispatch({
				type: ELIMINAR_RESERVA_SUCCESS,
			});
			dispatch(setAlert('Su reserva fue eliminada', 'success'));
		} else {
			dispatch({
				type: ELIMINAR_RESERVA_FAIL
			});
			dispatch(setAlert(res.data.usuario[0], 'danger'));
		}
	}
	catch (err) {
		dispatch({
			type: ELIMINAR_RESERVA_FAIL
		});
		dispatch(setAlert('Error al elimnar su reserva', 'danger'));
	}

};

