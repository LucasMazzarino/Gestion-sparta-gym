import {
	RESERVA_HORARIO_SUCCESS,
	RESERVA_HORARIO_FAIL,
	GET_RESERVA_HORARIO_SUCCESS,
	GET_RESERVA_HORARIO_FAIL
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
				type: RESERVA_HORARIO_FAIL
			});
			dispatch(setAlert('Error al seleccionar reserva', 'danger'));
		}
	}
	catch (err) {
		dispatch({
			type: RESERVA_HORARIO_FAIL
		});
		dispatch(setAlert('Error en la peticion', 'danger'));
	}

}

// const get_reservas_horarios = () => async (dispatch) => {

// 	const config = {
// 		Headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	};

// 	try {
// 		const res = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios/reservas/${usuario_id}`, config);

// 		if (res.status === 200) {
// 			dispatch({
// 				type: GET_RESERVA_HORARIO_SUCCESS,
// 			});
// 			dispatch(setAlert('Reserva agregada con exito', 'success'));
// 		} else {
// 			dispatch({
// 				type: GET_RESERVA_HORARIO_FAIL
// 			});
// 			dispatch(setAlert('No se pudieron cargar tus horarios, error en elservidor', 'danger'));
// 		}
// 	}
// 	catch (err) {
// 		dispatch({
// 			type: GET_RESERVA_HORARIO_FAIL
// 		});
// 		dispatch(setAlert('No se pudieron cargar tus horarios, error en el servidor', 'danger'));
// 	}

// };

