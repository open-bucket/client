import { Consumer } from 'obn';
import { push } from 'react-router-redux';

export const SET_CONSUMERS = 'SET_CONSUMERS';
export const GET_CONSUMERS = 'GET_CONSUMERS';
export const GET_CONSUMERS_FAIL = 'GET_CONSUMER_FAIL';

export function setConsumers(consumers) {
  return {
    type: SET_CONSUMERS,
    consumers
  };
}

export function getConsumer() {
  return async (dispatch) => {
    try {
      // TODO: call api
      dispatch({ type: GET_CONSUMERS });
      const consumers = await Consumer.getConsumersP();
      dispatch(setConsumers(consumers));
    } catch (e) {
      // TODO: dispatch error
      dispatch(getConsumerFail(e));
    }
  };
}

export function getConsumerFail(error) {
  return (dispatch) => {
    dispatch({ type: GET_CONSUMERS_FAIL, error });
    dispatch(push('/'));
  };
}
