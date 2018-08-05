
import { Consumer } from '@open-bucket/daemon';
import { notification } from 'antd';
import { getConsumers, getFiles } from './consumer';

export const SET_SELECTED_CONSUMER_ID = 'SET_SELECTED_CONSUMER_ID';

export const UPDATE_CONSUMER = 'UPDATE_CONSUMER';
export const UPDATE_CONSUMER_SUCCESS = 'UPDATE_CONSUMER_SUCCESS';
export const UPDATE_CONSUMER_FAIL = 'UPDATE_CONSUMER_FAIL';

export const SET_IS_EDITING_NAME = 'SET_IS_EDITING_NAME';

export const SET_VISIBLE_ACTIVATE_CONSUMER_FORM = 'SET_VISIBLE_ACTIVATE_CONSUMER_FORM';

export const ACTIVE_CONSUMER = 'ACTIVE_CONSUMER';
export const ACTIVE_CONSUMER_SUCCESS = 'ACTIVE_CONSUMER_SUCCESS';
export const ACTIVE_CONSUMER_FAIL = 'ACTIVE_CONSUMER_FAIL';

export const SELECT_FILES = 'SELECT_FILES';

export const setSelectedConsumerId = ({ selectedConsumerId }) => async (dispatch) => {
  dispatch({ type: SET_SELECTED_CONSUMER_ID, selectedConsumerId });
  if (selectedConsumerId) {
    dispatch(getFiles(selectedConsumerId));
    dispatch(getConsumerBalance({ consumerId: selectedConsumerId }));
  }
};

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
  notification.error({
    message: 'Could not update consumer'
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
    notification.info({
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
    notification.error({
      message: 'Could not active consumer'
    });
  };
}

export const SET_IS_DELETING_FILE = 'SET_IS_DELETING_FILE';

export const setIsDeletingFile = ({ isDeletingFile }) => ({
  type: SET_IS_DELETING_FILE,
  isDeletingFile
});

export const GET_CONSUMER_BALANCE = 'GET_CONSUMER_BALANCE';
export const GET_CONSUMER_BALANCE_SUCCESS = 'GET_CONSUMER_BALANCE_SUCCESS';
export const GET_CONSUMER_BALANCE_FAIL = 'GET_CONSUMER_BALANCE_FAIL';

export const getConsumerBalance = ({ consumerId }) => async (dispatch) => {
  try {
    dispatch({ type: GET_CONSUMER_BALANCE, consumerId });
    const balance = await Consumer.getBalanceP(consumerId);
    dispatch({ type: GET_CONSUMER_BALANCE_SUCCESS, balance });
  } catch (error) {
    dispatch({ type: GET_CONSUMER_BALANCE_FAIL, error });
    notification.error({
      message: 'Could not get consumer balance'
    });
  }
};
