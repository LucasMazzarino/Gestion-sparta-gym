import {
    RESERVA_HORARIO__SUCCESS,
    RESERVA_HORARIO_FAIL
}from './types'
import { setAlert } from './alert';
import axios from 'axios'

export const reservar_horario = (uid , cid) => async dispatch => {

    const config = {
			Headers: {
					'Content-Type': 'application/json'
			}
    };
    
    const body = JSON.stringify({
        uid,
				cid
    });

	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/usuarios/reservas/`, body, config);

		if (res.status === 200) {
				dispatch({
						type: RESERVA_HORARIO__SUCCESS,
				});
				dispatch(setAlert('Reserva agregada con exito', 'success'));
		} else {
				dispatch({
						type: RESERVA_HORARIO_FAIL
				});
				dispatch(setAlert('Error al seleccionar reserva', 'danger'));
		}
	}	
	catch(err){
			dispatch({
					type: RESERVA_HORARIO_FAIL
			});
			dispatch(setAlert('Error al iniciar sesion. Datos incorrectos', 'danger'));
	}

}
