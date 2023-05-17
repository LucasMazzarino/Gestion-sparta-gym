 import { 
  	LOGIN_SUCCESS,
  	LOGIN_FAIL,
  	SET_AUTENTICACION_CARGANDO,
  	REMOVE_AUTENTICACION_CARGANDO,
  	USUARIO_CARGADO_SUCCES,
  	USUARIO_CARGADO_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    AUTHENTICACION_FAIL,
    AUTHENTICACION_SUCCESS,
    LOGOUT,
    RESETEO_PASSWORD_SUCCESS,
    RESETEO_PASSWORD_FAIL,
    CONFIRMACION_RESETEO_PASSWORD_SUCCESS,
    CONFIRMACION_RESETEO_PASSWORD_FAIL,
} from './types'
import { setAlert } from './alert';
import axios from 'axios'


export const load_user = () => async dispatch => {
  if(localStorage.getItem('access')){
      const config = {
          headers: {
              'Authorization': `JWT ${localStorage.getItem('access')}`,
              'Accept': 'application/json'
          }
      };

      try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
      
          	if (res.status === 200) {
              dispatch({
                  type: USUARIO_CARGADO_SUCCES,
                  payload: res.data
              });
          	} else {
				dispatch({
				type:USUARIO_CARGADO_FAIL
          		});
      		}
		}
      	catch(err){
          dispatch({
              type: USUARIO_CARGADO_FAIL
          	});
      	}
  	} else {
      dispatch({
          type: USUARIO_CARGADO_FAIL
      });
  }
}

export const login = (documento, password) => async dispatch => {
  dispatch({
      type: SET_AUTENTICACION_CARGANDO
  });

  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({
      documento,
      password
  });

  try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
  
      if (res.status === 200) {
          dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data             
          });
		  dispatch(load_user());
          dispatch({
              type: REMOVE_AUTENTICACION_CARGANDO
          });
          dispatch(setAlert('Inicio de sesión con éxito', 'success'));             
      } else {
          dispatch({
              type: LOGIN_FAIL
          });
          dispatch({
              type: REMOVE_AUTENTICACION_CARGANDO
          });
          dispatch(setAlert('Error al iniciar sesion.', 'danger'));
      }
  }
  catch(err){
      dispatch({
          type: LOGIN_FAIL
      });
      dispatch({
          type: REMOVE_AUTENTICACION_CARGANDO
      });
      dispatch(setAlert('Error al iniciar sesion. Datos incorrectos', 'danger'));
  }
}

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);
            
            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        }catch(err){
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

export const check_authenticated = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICACION_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICACION_FAIL
                });
            }
        } catch(err){
            dispatch({
                type: AUTHENTICACION_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICACION_FAIL
        });
    }
}

export const reset_password = (email) => async dispatch => {
    dispatch({
        type: SET_AUTENTICACION_CARGANDO
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        
        if (res.status === 204) {
            dispatch({
                type: RESETEO_PASSWORD_SUCCESS
            });
            dispatch({
                type: REMOVE_AUTENTICACION_CARGANDO
            });
            dispatch(setAlert('Email para resetar la contraseña fue enviado', 'success'));
        } else {
            dispatch({
                type: RESETEO_PASSWORD_FAIL
            });
            dispatch({
                type: REMOVE_AUTENTICACION_CARGANDO
            });
            dispatch(setAlert('Error al enviar el correo', 'danger'));
        }
    }
    catch(err){
        dispatch({
            type: RESETEO_PASSWORD_FAIL
        });
        dispatch({
            type: REMOVE_AUTENTICACION_CARGANDO
        });
        dispatch(setAlert('Error al enviar el correo', 'danger'));
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert('Cerraste sesión con éxito', 'success'));
}

export const confirm_reset_password = (uid, token, new_password, re_new_password) => async dispatch => {
    dispatch({
        type: SET_AUTENTICACION_CARGANDO
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password
    });

    if (new_password !== re_new_password) {
        dispatch({
            type: CONFIRMACION_RESETEO_PASSWORD_FAIL
        });
        dispatch({
            type: REMOVE_AUTENTICACION_CARGANDO
        });
        dispatch(setAlert('Las contraseñas no coinciden', 'danger'));
    } else {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        
            if (res.status === 204) {
                dispatch({
                    type: CONFIRMACION_RESETEO_PASSWORD_SUCCESS
                });
                dispatch({
                    type: REMOVE_AUTENTICACION_CARGANDO
                });
                dispatch(setAlert('Tu contraseña se reseteo', 'success'));
            } else {
                dispatch({
                    type: CONFIRMACION_RESETEO_PASSWORD_FAIL
                });
                dispatch({
                    type: REMOVE_AUTENTICACION_CARGANDO
                });
                dispatch(setAlert('Error al cambiar la contraseña', 'danger'));
            }
        } catch(err){
            dispatch({
                type: CONFIRMACION_RESETEO_PASSWORD_FAIL
            });
            dispatch({
                type: REMOVE_AUTENTICACION_CARGANDO
            });
            dispatch(setAlert('Error al cambiar la contraseña', 'danger'));
        }
    }
}


