import { push } from 'react-router-redux';

export const LOGIN = 'LOGIN';

export function login() {
  return (dispatch) => {
    dispatch({ type: LOGIN });
    dispatch(push('/consumers'));
  };
}

export function register() {
  return (dispatch) => {
    dispatch(push('/register'));
  };
}
