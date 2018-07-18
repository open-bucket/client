import { push } from 'react-router-redux';
import { Auth } from '@open-bucket/daemon';
import { notification } from 'antd';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const SET_USER = 'SET_USER';

export function login({ username, password }) {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN });
      const user = await Auth.loginP({ username, password });
      dispatch(loginSuccess());
      dispatch(setUser({ user }));
    } catch (e) {
      dispatch(loginFail(e));
    }
  };
}

export function loginSuccess() {
  return (dispatch) => {
    dispatch({ type: LOGIN_SUCCESS });
    dispatch(push('/consumers'));
  };
}

export function loginFail(error) {
  return (dispatch) => {
    notification.open({
      message: 'Could not login'
    });
    dispatch({ type: LOGIN_FAIL, error });
  };
}

export function register({ username, password }) {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTER });
      await Auth.registerP({ username, password });
      dispatch(registerSuccess());
    } catch (e) {
      dispatch(registerFail(e));
    }
  };
}

export function registerSuccess() {
  return async (dispatch) => {
    dispatch({ type: REGISTER_SUCCESS });
    notification.open({
      message: 'Register success'
    });
    dispatch(push('/login'));
  };
}

export function registerFail(error) {
  return (dispatch) => {
    notification.open({
      message: 'Could not register'
    });
    dispatch({ type: REGISTER_FAIL, error });
  };
}

export function setUser({ user }) {
  return { type: SET_USER, user };
}
