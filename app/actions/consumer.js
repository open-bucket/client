import { Consumer } from '@open-bucket/daemon';
import { push } from 'react-router-redux';
import { notification } from 'antd';
import { getFiles } from './consumerContent';

const keepAlive = true;

export const GET_CONSUMERS_SUCCESS = 'GET_CONSUMERS_SUCCESS';
export const GET_CONSUMERS = 'GET_CONSUMERS';
export const GET_CONSUMERS_FAIL = 'GET_CONSUMER_FAIL';

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
    notification.error({
      message: 'Could not get consumer'
    });
    dispatch(push('/'));
  };
}


export const SET_VISIBLE_CREATE_CONSUMER_FORM = 'SET_VISIBLE_CREATE_CONSUMER_FORM';

export const setVisibleCreateConsumerForm = ({ isVisibleCreateConsumerForm }) =>
  ({ type: SET_VISIBLE_CREATE_CONSUMER_FORM, isVisibleCreateConsumerForm });


export const CREATE_CONSUMER = 'CREATE_CONSUMER';
export const CREATE_CONSUMER_SUCCESS = 'CREATE_CONSUMER_SUCCESS';
export const CREATE_CONSUMER_FAIL = 'CREATE_CONSUMER_FAIL';

export function createConsumer({ name, tier }) {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_CONSUMER, name, tier });
      dispatch(setVisibleCreateConsumerForm({ isVisibleCreateConsumerForm: false }));
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
    notification.error({
      message: 'Could not create consumer'
    });
  };
}

export const UPLOAD = 'UPLOAD';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';

export const upload = ({ filePath, consumerId }) => async (dispatch) => {
  dispatch({ type: UPLOAD, filePath, consumerId });
  try {
    await Consumer.uploadP({ filePath, consumerId, keepAlive });
    dispatch({ type: UPLOAD_SUCCESS, consumerId });
    dispatch(getFiles(consumerId));
    notification.success({
      message: `Upload success file: ${filePath}`
    });
  } catch (error) {
    dispatch({ type: UPLOAD_FAIL, error, consumerId });
    notification.error({
      message: 'Upload failed'
    });
  }
};

export const DOWNLOAD = 'DOWNLOAD';
export const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS';
export const DOWNLOAD_FAIL = 'DOWNLOAD_FAIL';

export const download = ({ fileId, consumerId, downloadPath }) => async (dispatch) => {
  try {
    dispatch({ type: DOWNLOAD, fileId, consumerId, downloadPath });
    await Consumer.downloadP({ fileId, consumerId, downloadPath, keepAlive });
    dispatch({ type: DOWNLOAD_SUCCESS, fileId, consumerId, downloadPath });
    notification.success({
      message: 'Download success',
      description: 'Check your download folder'
    });
  } catch (error) {
    dispatch({ type: DOWNLOAD_FAIL, error, fileId, consumerId, downloadPath });
    notification.error({
      message: 'Download failed'
    });
  }
};

export const DELETE_FILE = 'DELETE_FILE';
export const DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS';
export const DELETE_FILE_FAIL = 'DELETE_FILE_FAIL';

export const deleteFile = ({ consumerId, fileId }) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FILE, fileId, consumerId });
    await Consumer.deleteFileP({ fileId, consumerId });
    dispatch({ type: DELETE_FILE_SUCCESS, fileId, consumerId });
  } catch (error) {
    dispatch({ type: DELETE_FILE_FAIL, error, fileId, consumerId });
    notification.error({
      message: 'Delete file failed'
    });
  }
};

export const UPDATE_CONSUMER = 'UPDATE_CONSUMER';
export const UPDATE_CONSUMER_SUCCESS = 'UPDATE_CONSUMER_SUCCESS';
export const UPDATE_CONSUMER_FAIL = 'UPDATE_CONSUMER_FAIL';

export const updateConsumer = (consumer) => async (dispatch) => {
  dispatch({ type: UPDATE_CONSUMER, consumer });
  try {
    const updatedConsumer = await Consumer.updateConsumerP(consumer);
    dispatch({ type: UPDATE_CONSUMER_SUCCESS, consumer: updatedConsumer });
  } catch (error) {
    dispatch(updateConsumerFail({ error, consumer }));
  }
};

export const updateConsumerFail = (error) => (dispatch) => {
  dispatch({ type: UPDATE_CONSUMER_FAIL, error });
  notification.error({
    message: 'Could not update consumer'
  });
};
