import { Producer } from '@open-bucket/daemon';
import { push } from 'react-router-redux';
import { notification } from 'antd';
import * as R from 'ramda';

const keepAlive = true;

export const GET_PRODUCERS_SUCCESS = 'GET_PRODUCERS_SUCCESS';
export const GET_PRODUCERS = 'GET_PRODUCERS';
export const GET_PRODUCERS_FAIL = 'GET_PRODUCERS_FAIL';

export const SET_IS_VISIBLE_CREATE_PRODUCER_FORM = 'SET_IS_VISIBLE_CREATE_PRODUCER_FORM';

export const CREATE_PRODUCER = 'CREATE_PRODUCER';
export const CREATE_PRODUCER_SUCCESS = 'CREATE_PRODUCER_SUCCESS';
export const CREATE_PRODUCER_FAIL = 'CREATE_PRODUCER_FAIL';

export const START_PRODUCER = 'START_PRODUCER';
export const START_PRODUCER_SUCCESS = 'START_PRODUCER_SUCCESS';
export const START_PRODUCER_FAIL = 'START_PRODUCER_FAIL';

export function getProducers() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCERS });
      const producers = await Producer.getAllProducersP();
      dispatch({
        type: GET_PRODUCERS_SUCCESS,
        producers
      });
      dispatch(getConnectedProducers());
    } catch (e) {
      dispatch(getProducersFail(e));
    }
  };
}

export function getProducersFail(error) {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCERS_FAIL, error });
    notification.error({
      message: 'Could not get producer'
    });
    dispatch(push('/'));
  };
}

export const setIsVisibleCreateProducerForm = ({ isVisibleCreateProducerForm }) =>
  ({ type: SET_IS_VISIBLE_CREATE_PRODUCER_FORM, isVisibleCreateProducerForm });


export function createProducer({ spacePath, spaceLimit, name }) {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCER, name, spacePath, spaceLimit });
      dispatch(setIsVisibleCreateProducerForm({ isVisibleCreateProducerForm: false }));
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
    notification.error({
      message: 'Could not create consumer'
    });
  };
}

export const startProducer = ({ producerId }) => async (dispatch) => {
  try {
    dispatch({ type: START_PRODUCER, producerId });
    const connectedProducers = await Producer.getConnectedProducersP();
    if (R.find(R.propEq('id', producerId), connectedProducers)) {
      dispatch(startProducerFail({ error: new Error('This producer has started somewhere.'), producerId }));
    } else {
      const stopProducerAsync = await Producer.startProducerP(producerId, keepAlive);
      const context = { producerId, stopProducerAsync };
      dispatch({ type: START_PRODUCER_SUCCESS, context });
      dispatch(getConnectedProducers());
    }
  } catch (error) {
    dispatch(startProducerFail({ error, producerId }));
  }
};

export const startProducerFail = ({ error, producerId }) => {
  notification.error({
    message: 'Could not start producer',
    description: error.message
  });
  return { type: START_PRODUCER_FAIL, error, producerId };
};


export const STOP_PRODUCER = 'STOP_PRODUCER';
export const STOP_PRODUCER_SUCCESS = 'STOP_PRODUCER_SUCCESS';
export const STOP_PRODUCER_FAIL = 'STOP_PRODUCER_FAIL';

export const stopProducer = ({ producerId }) => async (dispatch, getState) => {
  try {
    dispatch({ type: STOP_PRODUCER, producerId });
    const state = getState();
    const context = R.find(R.propEq('producerId', producerId))(state.producer.runningProducerContexts);
    await context.stopProducerAsync();
    dispatch({ type: STOP_PRODUCER_SUCCESS, producerId });
    dispatch(getConnectedProducers());
  } catch (error) {
    notification.error({
      message: 'Could not stop producer'
    });
    dispatch({ type: STOP_PRODUCER_FAIL, error, producerId });
  }
};

export const UPDATE_PRODUCER = 'UPDATE_PRODUCER';
export const UPDATE_PRODUCER_SUCCESS = 'UPDATE_PRODUCER_SUCCESS';
export const UPDATE_PRODUCER_FAIL = 'UPDATE_PRODUCER_FAIL';

export const updateProducer = (producer) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCER, producer });
  try {
    const updatedProducer = await Producer.updateProducerP(producer);
    dispatch({ type: UPDATE_PRODUCER_SUCCESS, producer: updatedProducer });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCER_FAIL, error });
    notification.error({
      message: 'Could not update producer'
    });
  }
};

export const GET_CONNECTED_PRODUCERS = 'GET_CONNECTED_PRODUCERS';
export const GET_CONNECTED_PRODUCERS_SUCCESS = 'GET_CONNECTED_PRODUCERS_SUCCESS';
export const GET_CONNECTED_PRODUCERS_FAIL = 'GET_CONNECTED_PRODUCERS_FAIL';

export const getConnectedProducers = () => async (dispatch) => {
  dispatch({ type: GET_CONNECTED_PRODUCERS });
  try {
    const connectedProducers = await Producer.getConnectedProducersP();
    dispatch({ type: GET_CONNECTED_PRODUCERS_SUCCESS, connectedProducers });
  } catch (error) {
    dispatch({ type: GET_CONNECTED_PRODUCERS_FAIL, error });
    notification.error({
      message: 'Could not get connected producer'
    });
  }
};
