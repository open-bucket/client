import { Producer } from '@open-bucket/daemon';
import { push } from 'react-router-redux';
import { notification } from 'antd';


export const GET_PRODUCERS_SUCCESS = 'GET_PRODUCERS_SUCCESS';
export const GET_PRODUCERS = 'GET_PRODUCERS';
export const GET_PRODUCERS_FAIL = 'GET_PRODUCERS_FAIL';

export const CREATE_PRODUCER = 'CREATE_PRODUCER';
export const CREATE_PRODUCER_SUCCESS = 'CREATE_PRODUCER_SUCCESS';
export const CREATE_PRODUCER_FAIL = 'CREATE_PRODUCER_FAIL';

export function getProducers() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCERS });
      const producers = await Producer.getAllProducersP();
      dispatch({
        type: GET_PRODUCERS_SUCCESS,
        producers
      });
    } catch (e) {
      dispatch(getProducersFail(e));
    }
  };
}

export function getProducersFail(error) {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCERS_FAIL, error });
    notification.open({
      message: 'Could not get producer',
      description: error
    });
    dispatch(push('/'));
  };
}

export function createProducer({ spacePath, spaceLimit, name }) {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCER, name, spacePath, spaceLimit });
      const producerInfo = await Producer.createProducerP({ name, spacePath, spaceLimit });
      dispatch({ type: CREATE_PRODUCER_SUCCESS, producerInfo });
      dispatch(getProducers());
    } catch (error) {
      dispatch(createProducerFail(error));
    }
  };
}

export function createProducerFail(error) {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCERS_FAIL, error });
    notification.open({
      message: 'Could not create consumer',
      description: error
    });
  };
}
