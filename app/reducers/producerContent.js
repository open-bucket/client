import {
  SET_SELECTED_PRODUCER,
  SET_VISIBLE_ACTIVATE_PRODUCER_FORM } from '../actions/producerContent';

const INITIAL_STATE = {
  selectedProducer: null,
  isEditingName: false,
  isVisibleActivationForm: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SELECTED_PRODUCER:
      return { ...state, selectedProducer: action.selectedProducer, isEditingName: false };
    case SET_VISIBLE_ACTIVATE_PRODUCER_FORM:
      return { ...state, isVisibleActivationForm: action.isVisibleActivationForm };
    default:
      return state;
  }
}
