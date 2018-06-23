import { Auth } from '@open-bucket/daemon';
import { push } from 'react-router-redux';
import { notification } from 'antd';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

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
      message: 'Could not register',
      description: error
    });
    dispatch({ type: REGISTER_FAIL, error });
  };
}
