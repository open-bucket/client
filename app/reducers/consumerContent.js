import { SET_IS_EDITING_NAME, SET_SELECTED_CONSUMER, UPDATE_CONSUMER_SUCCESS } from '../actions/consumerContent';

const INITIAL_STATE = {
  selectedConsumer: null,
  isEditingName: false
};

export default function consumer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SELECTED_CONSUMER:
      return { ...state, selectedConsumer: action.selectedConsumer, isEditingName: false };
    case SET_IS_EDITING_NAME:
      return { ...state, isEditingName: action.isEditingName };
    case UPDATE_CONSUMER_SUCCESS:
      return { ...state, selectedConsumer: action.consumer, isEditingName: false };
    default:
      return state;
  }
}
