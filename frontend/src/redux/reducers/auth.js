import {
  LOGIN_SUCCESS,
  LOGIN_FAIL, 
  SET_AUTENTICACION_CARGANDO,
  REMOVE_AUTH_LOADING,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  REFRESH_SUCCESS,
	REFRESH_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CONFIRM_RESET_PASSWORD__SUCCESS,
  CONFIRM_RESET_PASSWORD__FAIL,
 } from '../actions/types'

  const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    loading: false,
    staff: false,
    user: null,
    cursos_usuario: null,
    id:localStorage.getItem('id'),
  }


  export default function Auth(state = initialState, action){
    const {type, payload} = action;

    switch(type) {
        case SET_AUTENTICACION_CARGANDO:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        case USER_LOADED_SUCCESS:
          localStorage.setItem('id',payload.id)
            return {
                ...state,
                user: payload,
                staff: payload.is_staff,
                cursos_usuario:payload.cursos,
                id:payload.id
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case AUTHENTICATED_SUCCESS:
          return {
              ...state,
              isAuthenticated: true
          }
        case AUTHENTICATED_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
          return {
              ...state,
              isAuthenticated: false,
              access: null,
              refresh: null
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
        case RESET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_FAIL:
        case CONFIRM_RESET_PASSWORD__SUCCESS:
        case CONFIRM_RESET_PASSWORD__FAIL:
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

