import {
  SET_SELECTED_PRODUCER_ID,
  SET_VISIBLE_ACTIVATE_PRODUCER_FORM,
  GET_SPACE_STATUS_SUCCESS,
  GET_PRODUCER_BALANCE_SUCCESS } from '../actions/producerContent';

const INITIAL_STATE = {
  selectedProducerId: null,
  isEditingName: false,
  isVisibleActivationForm: false,
  spaceLimit: 0,
  actualSize: 0,
  availableSpace: 0,
  balance: 0
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SELECTED_PRODUCER_ID:
      return { ...state, selectedProducerId: action.selectedProducerId, isEditingName: false };
    case SET_VISIBLE_ACTIVATE_PRODUCER_FORM:
      return { ...state, isVisibleActivationForm: action.isVisibleActivationForm };
    case GET_SPACE_STATUS_SUCCESS:
      return { ...state,
        spaceLimit: action.spaceLimit,
        actualSize: action.actualSize,
        availableSpace: action.availableSpace
      };
    case GET_PRODUCER_BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.balance
      };
    default:
      return state;
  }
}
