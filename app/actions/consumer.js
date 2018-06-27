import { Consumer } from '@open-bucket/daemon';
import { push } from 'react-router-redux';
import { notification } from 'antd';
import { v4 as uuid } from 'uuid';

export const GET_CONSUMERS_SUCCESS = 'GET_CONSUMERS_SUCCESS';
export const GET_CONSUMERS = 'GET_CONSUMERS';
export const GET_CONSUMERS_FAIL = 'GET_CONSUMER_FAIL';

export const CREATE_CONSUMER = 'CREATE_CONSUMER';
export const CREATE_CONSUMER_SUCCESS = 'CREATE_CONSUMER_SUCCESS';
export const CREATE_CONSUMER_FAIL = 'CREATE_CONSUMER_FAIL';

export const SET_SELECTED_CONSUMER = 'SET_SELECTED_CONSUMER';

export const UPDATE_CONSUMER = 'UPDATE_CONSUMER';
export const UPDATE_CONSUMER_SUCCESS = 'UPDATE_CONSUMER_SUCCESS';
export const UPDATE_CONSUMER_FAIL = 'UPDATE_CONSUMER_FAIL';

export const SET_IS_EDITING_ADDRESS = 'SET_IS_EDITING_ADDRESS';

export function getConsumers() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_CONSUMERS });
      const consumers = await Consumer.getConsumersP();
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

export function createConsumer() {
  return async (dispatch) => {
    try {
      const address = uuid();
      dispatch({ type: CREATE_CONSUMER, address });
      const consumerInfo = await Consumer.createConsumerP({ address });
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

export function setSelectedConsumer({ selectedConsumer }) {
  return { type: SET_SELECTED_CONSUMER, selectedConsumer };
}

export const updateConsumer = (consumer) => async (dispatch) => {
  dispatch({ type: UPDATE_CONSUMER, consumer });
  try {
    const newConsumer = await Consumer.updateConsumerP(consumer);
    dispatch({ type: UPDATE_CONSUMER_SUCCESS, consumer: newConsumer });
  } catch (error) {
    dispatch(updateConsumerFail(error));
  }
};

export const updateConsumerFail = (error) => (dispatch) => {
  dispatch({ type: UPDATE_CONSUMER_FAIL, error });
  notification.open({
    message: 'Could not update consumer',
    description: error
  });
};

export const setIsEditingAddress = (isEditingAddress) => (dispatch) => {
  dispatch({ type: SET_IS_EDITING_ADDRESS, isEditingAddress });
};

