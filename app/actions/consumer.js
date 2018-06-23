import { Consumer } from '@open-bucket/daemon';
import { push } from 'react-router-redux';
import { notification } from 'antd';

export const GET_CONSUMERS_SUCCESS = 'GET_CONSUMERS_SUCCESS';
export const GET_CONSUMERS = 'GET_CONSUMERS';
export const GET_CONSUMERS_FAIL = 'GET_CONSUMER_FAIL';

export function getConsumer() {
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
