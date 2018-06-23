import { push } from 'react-router-redux';
import { Auth } from '@open-bucket/daemon';
import { notification } from 'antd';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function login({ username, password }) {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN });
      await Auth.loginP({ username, password });
      dispatch(loginSuccess());
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
      message: 'Could not login',
      description: error
    });
    dispatch({ type: LOGIN_FAIL, error });
  };
}
