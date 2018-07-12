
import { Producer } from '@open-bucket/daemon';
import { notification } from 'antd';
import { getProducers } from './producer';

export const SET_SELECTED_PRODUCER = 'SET_SELECTED_PRODUCER';

export const UPDATE_PRODUCER = 'UPDATE_PRODUCER';
export const UPDATE_PRODUCER_SUCCESS = 'UPDATE_PRODUCER_SUCCESS';
export const UPDATE_PRODUCER_FAIL = 'UPDATE_PRODUCER_FAIL';

export const SET_IS_EDITING_NAME = 'SET_IS_EDITING_NAME';


export function setSelectedProducer({ selectedProducer }) {
  return { type: SET_SELECTED_PRODUCER, selectedProducer };
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
  notification.open({
    message: 'Could not update producer',
    description: error
  });
};

export const setIsEditingName = (isEditingName) => (dispatch) => {
  dispatch({ type: SET_IS_EDITING_NAME, isEditingName });
};

