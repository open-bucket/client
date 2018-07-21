import {
  SET_IS_EDITING_NAME,
  SET_SELECTED_CONSUMER,
  UPDATE_CONSUMER_SUCCESS,
  SET_VISIBLE_ACTIVATE_CONSUMER_FORM,
  GET_FILES_SUCCESS,
  SELECT_FILES
} from '../actions/consumerContent';

const INITIAL_STATE = {
  selectedConsumer: null,
  isEditingName: false,
  isVisibleActivationForm: false,
  files: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SELECTED_CONSUMER:
      return { ...state, selectedConsumer: action.selectedConsumer, isEditingName: false };
    case SET_IS_EDITING_NAME:
      return { ...state, isEditingName: action.isEditingName };
    case SET_VISIBLE_ACTIVATE_CONSUMER_FORM:
      return { ...state, isVisibleActivationForm: action.isVisibleActivationForm };
    case UPDATE_CONSUMER_SUCCESS:
      return { ...state, selectedConsumer: action.consumer, isEditingName: false };
    case GET_FILES_SUCCESS:
      return { ...state, files: action.files };
    default:
      return state;
  }
}
