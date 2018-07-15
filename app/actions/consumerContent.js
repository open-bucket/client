
import { Consumer } from '@open-bucket/daemon';
import { notification } from 'antd';
import { getConsumers } from './consumer';

export const SET_SELECTED_CONSUMER = 'SET_SELECTED_CONSUMER';

export const UPDATE_CONSUMER = 'UPDATE_CONSUMER';
export const UPDATE_CONSUMER_SUCCESS = 'UPDATE_CONSUMER_SUCCESS';
export const UPDATE_CONSUMER_FAIL = 'UPDATE_CONSUMER_FAIL';

export const SET_IS_EDITING_NAME = 'SET_IS_EDITING_NAME';

export const SET_VISIBLE_ACTIVATE_CONSUMER_FORM = 'SET_VISIBLE_ACTIVATE_CONSUMER_FORM';

export const ACTIVE_CONSUMER = 'ACTIVE_CONSUMER';
export const ACTIVE_CONSUMER_SUCCESS = 'ACTIVE_CONSUMER_SUCCESS';
export const ACTIVE_CONSUMER_FAIL = 'ACTIVE_CONSUMER_FAIL';

export const UPLOAD = 'UPLOAD';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';

export const DOWNLOAD = 'DOWNLOAD';
export const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS';
export const DOWNLOAD_FAIL = 'DOWNLOAD_FAIL';

export function setSelectedConsumer({ selectedConsumer }) {
  return { type: SET_SELECTED_CONSUMER, selectedConsumer };
}

export const updateConsumer = (consumer) => async (dispatch) => {
  dispatch({ type: UPDATE_CONSUMER, consumer });
  try {
    const newConsumer = await Consumer.updateConsumerP(consumer);
    dispatch({ type: UPDATE_CONSUMER_SUCCESS, consumer: newConsumer });
    dispatch(getConsumers());
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

export const setIsEditingName = (isEditingName) => ({ type: SET_IS_EDITING_NAME, isEditingName });

export const setVisibleActivateConsumerForm = ({ isVisibleActivationForm }) =>
  ({ type: SET_VISIBLE_ACTIVATE_CONSUMER_FORM, isVisibleActivationForm });

export const activeConsumer = ({ consumerId, accountIndex, value }) => async (dispatch) => {
  try {
    dispatch({ type: ACTIVE_CONSUMER, consumerId, accountIndex, value });
    await Consumer.createConsumerActivationP({ consumerId, accountIndex, value });
    dispatch({ type: ACTIVE_CONSUMER_SUCCESS });
    dispatch(setVisibleActivateConsumerForm({ isVisibleActivationForm: false }));
    notification.open({
      message: 'Your consumer activation has been created, your consumer will be activated after a while'
    });
  } catch (error) {
    dispatch(activeFail(error));
  }
};

export const activeConsumerSuccess = ({ consumerId }) => {
  notification.open({
    message: `The request active consumer ${consumerId} was sent, `,
  });
};

export function activeFail(error) {
  return (dispatch) => {
    dispatch({ type: ACTIVE_CONSUMER_FAIL, error });
    notification.open({
      message: 'Could not active consumer',
      description: error
    });
  };
}

export const startUpload = ({ filePath }) => async (dispatch, getState) => {
  dispatch({ type: UPLOAD, filePath });
  // try {
  const state = getState();
  const consumerId = state.consumerContent.selectedConsumer.id;
  await Consumer.uploadP({ filePath, consumerId });
  dispatch({ type: UPLOAD_SUCCESS });
  dispatch(getConsumers());
  // } catch (error) {
  // dispatch(uploadFail(error));
  // }
};

export function uploadFail(error) {
  return (dispatch) => {
    dispatch({ type: UPLOAD_FAIL, error });
    notification.open({
      message: 'Could not upload',
      description: error
    });
  };
}
