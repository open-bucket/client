
import { Producer } from '@open-bucket/daemon';
import { notification } from 'antd';
import { getProducers } from './producer';

export const SET_SELECTED_PRODUCER = 'SET_SELECTED_PRODUCER';

export const UPDATE_PRODUCER = 'UPDATE_PRODUCER';
export const UPDATE_PRODUCER_SUCCESS = 'UPDATE_PRODUCER_SUCCESS';
export const UPDATE_PRODUCER_FAIL = 'UPDATE_PRODUCER_FAIL';

export const SET_IS_EDITING_NAME = 'SET_IS_EDITING_NAME';

export const SET_VISIBLE_ACTIVATE_PRODUCER_FORM = 'SET_VISIBLE_ACTIVATE_PRODUCER_FORM';

export const ACTIVE_PRODUCER = 'ACTIVE_PRODUCER';
export const ACTIVE_PRODUCER_SUCCESS = 'ACTIVE_PRODUCER_SUCCESS';
export const ACTIVE_PRODUCER_FAIL = 'ACTIVE_PRODUCER_FAIL';


export function setSelectedProducer({ selectedProducer }) {
  return { type: SET_SELECTED_PRODUCER, selectedProducer };
}

export const setVisibleActivateProducerForm = ({ isVisibleActivationForm }) =>
  ({ type: SET_VISIBLE_ACTIVATE_PRODUCER_FORM, isVisibleActivationForm });

export const activeProducer = ({ producerId, accountIndex }) => async (dispatch) => {
  try {
    dispatch({ type: ACTIVE_PRODUCER, producerId, accountIndex });
    await Producer.createProducerActivationP({ producerId, accountIndex });
    dispatch({ type: ACTIVE_PRODUCER_SUCCESS });
    dispatch(setVisibleActivateProducerForm({ isVisibleActivationForm: false }));
    notification.info({
      message: 'Your producer activation has been created, your producer will be activated after a while'
    });
  } catch (error) {
    dispatch(activeFail(error));
  }
};

export function activeFail(error) {
  return (dispatch) => {
    dispatch({ type: ACTIVE_PRODUCER_FAIL, error });
    notification.error({
      message: 'Could not active producer'
    });
  };
}

export const updateProducer = (producer) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCER, producer });
  try {
    // const newProducer = await Producer.(producer);
    dispatch({ type: UPDATE_PRODUCER_SUCCESS, consumer: newProducer });
    dispatch(getProducers());
  } catch (error) {
    dispatch(updateProducerFail(error));
  }
};

export const updateProducerFail = (error) => (dispatch) => {
  dispatch({ type: UPDATE_PRODUCER_FAIL, error });
  notification.error({
    message: 'Could not update producer'
  });
};

export const setIsEditingName = (isEditingName) => (dispatch) => {
  dispatch({ type: SET_IS_EDITING_NAME, isEditingName });
};

