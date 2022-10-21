import {
  LOGIN_SUCCESS,
  LOGIN_FAIL, 
  SET_AUTENTICACION_CARGANDO,
  REMOVE_AUTENTICACION_CARGANDO,
  USUARIO_CARGADO_SUCCES,
  USUARIO_CARGADO_FAIL,
  REFRESH_SUCCESS,
	REFRESH_FAIL,
  AUTHENTICACION_SUCCESS,
  AUTHENTICACION_FAIL,
  LOGOUT,
  RESETEO_PASSWORD_SUCCESS,
  RESETEO_PASSWORD_FAIL,
  CONFIRMACION_RESETEO_PASSWORD_SUCCESS,
  CONFIRMACION_RESETEO_PASSWORD_FAIL,
 } from '../actions/types'

  const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    staff: localStorage.getItem('staff'),
    isAuthenticated: null,
    loading: false,
    id:localStorage.getItem('id'),
    user: null,
    cursos_usuario: null,
  }


  export default function Auth(state = initialState, action){
    const {type, payload} = action;

    switch(type) {
        case SET_AUTENTICACION_CARGANDO:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTENTICACION_CARGANDO:
            return {
                ...state,
                loading: false
            }
        case USUARIO_CARGADO_SUCCES:
          localStorage.setItem('id',payload.id)
          localStorage.setItem('staff',payload.is_staff)
            return {
                ...state,
                user: payload,
                staff: payload.is_staff,
                cursos_usuario:payload.cursos,
                id:payload.id
            }
        case USUARIO_CARGADO_FAIL:
            return {
                ...state,
                user: null
            }
        case AUTHENTICACION_SUCCESS:
          return {
              ...state,
              isAuthenticated: true
          }
        case AUTHENTICACION_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('id')
            localStorage.removeItem('staff');
          return {
              ...state,
              isAuthenticated: false,
              access: null,
              refresh: null,
              id: null,
              staff: null,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
          return {
            ...state,
            isAuthenticated:true,
            access:localStorage.getItem('access'),
            refresh:localStorage.getItem('refresh'),
            id:localStorage.getItem('id'),
          }
        case RESETEO_PASSWORD_SUCCESS:
        case RESETEO_PASSWORD_FAIL:
        case CONFIRMACION_RESETEO_PASSWORD_SUCCESS:
        case CONFIRMACION_RESETEO_PASSWORD_FAIL:
          return {
            ...state
          }
        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
              ...state,
              access: localStorage.getItem('access')
            }
        case REFRESH_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('id')
            localStorage.removeItem('staff');
          return {
            ...state,
            access: null,
            refresh: null,
            isAuthenticated: false,
            user: null,
            staff:false,
            cursos_usuario: null,
            id:null
          }
        default:
          return state
    }
  }

