
import { Producer } from '@open-bucket/daemon';
import { notification } from 'antd';
import SpaceManager from '@open-bucket/daemon/dist/space-manager';
import { PRODUCER_STATES } from '@open-bucket/daemon/dist/enums';
import { getSelectedProducer } from '../utils/store';

export const SET_SELECTED_PRODUCER_ID = 'SET_SELECTED_PRODUCER_ID';

export const UPDATE_PRODUCER = 'UPDATE_PRODUCER';
export const UPDATE_PRODUCER_SUCCESS = 'UPDATE_PRODUCER_SUCCESS';
export const UPDATE_PRODUCER_FAIL = 'UPDATE_PRODUCER_FAIL';

export const SET_IS_EDITING_NAME = 'SET_IS_EDITING_NAME';

export const SET_VISIBLE_ACTIVATE_PRODUCER_FORM = 'SET_VISIBLE_ACTIVATE_PRODUCER_FORM';

export const ACTIVE_PRODUCER = 'ACTIVE_PRODUCER';
export const ACTIVE_PRODUCER_SUCCESS = 'ACTIVE_PRODUCER_SUCCESS';
export const ACTIVE_PRODUCER_FAIL = 'ACTIVE_PRODUCER_FAIL';

export const setSelectedProducerId = ({ selectedProducerId }) => (dispatch, getState) => {
  dispatch({ type: SET_SELECTED_PRODUCER_ID, selectedProducerId });
  if (selectedProducerId) {
    dispatch(getSpaceStatus({ producerId: selectedProducerId }));

    const state = getState();
    const selectedProducer = getSelectedProducer(state);
    if (selectedProducer && selectedProducer.state === PRODUCER_STATES.ACTIVE) {
      dispatch(getProducerBalance({ producerId: selectedProducerId }));
    }
  }
};

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

// export const updateProducer = (producer) => async (dispatch) => {
//   dispatch({ type: UPDATE_PRODUCER, producer });
//   try {
//     const newProducer = await Producer.(producer);
//     dispatch({ type: UPDATE_PRODUCER_SUCCESS, consumer: newProducer });
//     dispatch(getProducers());
//   } catch (error) {
//     dispatch(updateProducerFail(error));
//   }
// };

// export const updateProducerFail = (error) => (dispatch) => {
//   dispatch({ type: UPDATE_PRODUCER_FAIL, error });
//   notification.error({
//     message: 'Could not update producer'
//   });
// };

export const setIsEditingName = (isEditingName) => (dispatch) => {
  dispatch({ type: SET_IS_EDITING_NAME, isEditingName });
};

export const GET_SPACE_STATUS = 'GET_SPACE_STATUS';
export const GET_SPACE_STATUS_SUCCESS = 'GET_SPACE_STATUS_SUCCESS';
export const GET_SPACE_STATUS_FAIL = 'GET_SPACE_STATUS_FAIL';

export const getSpaceStatus = ({ producerId }) => async (dispatch) => {
  try {
    dispatch({ type: GET_SPACE_STATUS, producerId });
    const { spaceLimit, actualSize, availableSpace } = await SpaceManager
      .getProducerSpaceStatP(producerId);
    dispatch({ type: GET_SPACE_STATUS_SUCCESS, spaceLimit, actualSize, availableSpace });
  } catch (error) {
    dispatch({ type: GET_SPACE_STATUS_FAIL, error });
    notification.error({
      message: 'Could not get producer space status'
    });
  }
};

export const GET_PRODUCER_BALANCE = 'GET_PRODUCER_BALANCE';
export const GET_PRODUCER_BALANCE_SUCCESS = 'GET_PRODUCER_BALANCE_SUCCESS';
export const GET_PRODUCER_BALANCE_FAIL = 'GET_PRODUCER_BALANCE_FAIL';

export const getProducerBalance = ({ producerId }) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCER_BALANCE, producerId });
    const balance = await Producer.getBalanceP(producerId);
    dispatch({ type: GET_PRODUCER_BALANCE_SUCCESS, balance });
  } catch (error) {
    dispatch({ type: GET_PRODUCER_BALANCE_FAIL, error });
    notification.error({
      message: 'Could not get producer balance'
    });
  }
};

export const SET_IS_WITHDRAWING_PRODUCER = 'SET_IS_WITHDRAWING_PRODUCER';

export const setIsWithdrawingProducer = ({ isWithdrawingProducer }) => ({
  type: SET_IS_WITHDRAWING_PRODUCER,
  isWithdrawingProducer
});

export const WITHDRAW_PRODUCER = 'WITHDRAW_PRODUCER';
export const WITHDRAW_PRODUCER_SUCCESS = 'WITHDRAW_PRODUCER_SUCCESS';
export const WITHDRAW_PRODUCER_FAIL = 'WITHDRAW_PRODUCER_FAIL';

export const withdrawConsumer = ({ producerId, contractAddress }) => async (dispatch) => {
  try {
    dispatch({ type: WITHDRAW_PRODUCER, producerId, contractAddress });
    dispatch(setIsWithdrawingProducer({ isWithdrawingProducer: false }));
    notification.info({
      message: 'Transaction is being sent to tracker'
    });
    await Producer.withdrawP(producerId, contractAddress);
    dispatch(getProducerBalance({ producerId }));
    dispatch({ type: WITHDRAW_PRODUCER_SUCCESS, producerId, contractAddress });
    notification.success({
      message: 'Tracker was received your request, you will receive eth after a while.'
    });
  } catch (error) {
    dispatch({ type: WITHDRAW_PRODUCER_FAIL, error });
    notification.error({
      message: 'Could not withdraw from this producer'
    });
  }
};

