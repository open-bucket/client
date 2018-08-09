
import { Consumer } from '@open-bucket/daemon';
import { notification } from 'antd';
import { CONSUMER_STATES } from '@open-bucket/daemon/dist/enums';
import { getFiles } from './consumer';
import { getSelectedConsumer } from '../utils/store';

export const SET_SELECTED_CONSUMER_ID = 'SET_SELECTED_CONSUMER_ID';

export const SET_IS_EDITING_CONSUMER_NAME = 'SET_IS_EDITING_CONSUMER_NAME';

export const SET_VISIBLE_ACTIVATE_CONSUMER_FORM = 'SET_VISIBLE_ACTIVATE_CONSUMER_FORM';

export const ACTIVE_CONSUMER = 'ACTIVE_CONSUMER';
export const ACTIVE_CONSUMER_SUCCESS = 'ACTIVE_CONSUMER_SUCCESS';
export const ACTIVE_CONSUMER_FAIL = 'ACTIVE_CONSUMER_FAIL';

export const SELECT_FILES = 'SELECT_FILES';

export const setSelectedConsumerId = ({ selectedConsumerId }) => async (dispatch, getState) => {
  dispatch({ type: SET_SELECTED_CONSUMER_ID, selectedConsumerId });
  if (selectedConsumerId) {
    dispatch(getFiles(selectedConsumerId));

    const state = getState();
    const selectedConsumer = getSelectedConsumer(state);
    if (selectedConsumer && selectedConsumer.state === CONSUMER_STATES.ACTIVE) {
      dispatch(getConsumerBalance({ consumerId: selectedConsumerId }));
    }
  }
};

export const setIsEditingName = (isEditingName) =>
  ({ type: SET_IS_EDITING_CONSUMER_NAME, isEditingName });

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

export const SET_IS_WITHDRAWING_CONSUMER = 'SET_IS_WITHDRAWING_CONSUMER';

export const setIsWithdrawingConsumer = ({ isWithdrawingConsumer }) => ({
  type: SET_IS_WITHDRAWING_CONSUMER,
  isWithdrawingConsumer
});

export const WITHDRAW_CONSUMER = 'WITHDRAW_CONSUMER';
export const WITHDRAW_CONSUMER_SUCCESS = 'WITHDRAW_CONSUMER_SUCCESS';
export const WITHDRAW_CONSUMER_FAIL = 'WITHDRAW_CONSUMER_FAIL';

export const withdrawConsumer = ({ consumerId }) => async (dispatch) => {
  try {
    dispatch(setIsWithdrawingConsumer({ isWithdrawingConsumer: false }));
    dispatch({ type: WITHDRAW_CONSUMER, consumerId });
    notification.info({
      message: 'Withdraw request is being sent'
    });
    await Consumer.withdrawP(consumerId);
    dispatch(getConsumerBalance({ consumerId }));
    dispatch({ type: WITHDRAW_CONSUMER_SUCCESS, consumerId });
    notification.success({
      message: 'Withdraw request was sent, you will receive eth after a while.'
    });
  } catch (error) {
    dispatch({ type: WITHDRAW_CONSUMER_FAIL, error });
    notification.error({
      message: 'Could not withdraw from this consumer.'
    });
  }
};
