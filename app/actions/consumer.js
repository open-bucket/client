import { Consumer } from '@open-bucket/daemon';
import { push } from 'react-router-redux';
import { notification } from 'antd';


export const GET_CONSUMERS_SUCCESS = 'GET_CONSUMERS_SUCCESS';
export const GET_CONSUMERS = 'GET_CONSUMERS';
export const GET_CONSUMERS_FAIL = 'GET_CONSUMER_FAIL';

export const SET_VISIBLE_CREATE_CONSUMER_FORM = 'SET_VISIBLE_CREATE_CONSUMER_FORM';

export const CREATE_CONSUMER = 'CREATE_CONSUMER';
export const CREATE_CONSUMER_SUCCESS = 'CREATE_CONSUMER_SUCCESS';
export const CREATE_CONSUMER_FAIL = 'CREATE_CONSUMER_FAIL';

export function getConsumers() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_CONSUMERS });
      const consumers = await Consumer.getAllConsumersP();
      dispatch(getConsumersSuccess(consumers));
    } catch (e) {
      dispatch(getConsumerFail(e));
    }
  };
}

export function getConsumersSuccess(consumers) {
  return {
    type: GET_CONSUMERS_SUCCESS,
    consumers
  };
}

export function getConsumerFail(error) {
  return (dispatch) => {
    dispatch({ type: GET_CONSUMERS_FAIL, error });
    notification.open({
      message: 'Could not get consumer',
      description: error
    });
    dispatch(push('/'));
  };
}

export const setVisibleCreateConsumerForm = ({ isVisibleCreateConsumerForm }) =>
  ({ type: SET_VISIBLE_CREATE_CONSUMER_FORM, isVisibleCreateConsumerForm });

export function createConsumer({ name, tier }) {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_CONSUMER, name, tier });
      const consumerInfo = await Consumer.createConsumerP({ name, tier });
      dispatch(createConsumerSuccess({ consumerInfo }));
    } catch (error) {
      dispatch(createConsumerFail(error));
    }
  };
}

export function createConsumerSuccess({ consumerInfo }) {
  return dispatch => {
    dispatch({ type: CREATE_CONSUMER_SUCCESS, consumerInfo });
    dispatch(getConsumers());
  };
}

export function createConsumerFail(error) {
  return (dispatch) => {
    dispatch({ type: GET_CONSUMERS_FAIL, error });
    notification.open({
      message: 'Could not create consumer',
      description: error
    });
  };
}
