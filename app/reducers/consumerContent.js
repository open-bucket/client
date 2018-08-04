import {
  SET_IS_EDITING_NAME,
  SET_SELECTED_CONSUMER_ID,
  UPDATE_CONSUMER_SUCCESS,
  SET_VISIBLE_ACTIVATE_CONSUMER_FORM,
  SET_IS_DELETING_FILE
} from '../actions/consumerContent';

import {
  GET_FILES_SUCCESS,
  DELETE_FILE_SUCCESS
} from '../actions/consumer';

const INITIAL_STATE = {
  selectedConsumerId: null,
  isEditingName: false,
  isVisibleActivationForm: false,
  isDeletingFile: false,
  files: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SELECTED_CONSUMER_ID:
      return { ...state,
        selectedConsumerId: action.selectedConsumerId,
        isEditingName: false,
        isDeletingFile: false
      };
    case SET_IS_EDITING_NAME:
      return { ...state, isEditingName: action.isEditingName };
    case SET_VISIBLE_ACTIVATE_CONSUMER_FORM:
      return { ...state, isVisibleActivationForm: action.isVisibleActivationForm };
    case UPDATE_CONSUMER_SUCCESS:
      return { ...state, isEditingName: false };
    case SET_IS_DELETING_FILE:
      return { ...state, isDeletingFile: action.isDeletingFile };
    case GET_FILES_SUCCESS:
      return {
        ...state,
        files: action.files
      };
    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        files: state.files.filter(f => f.id !== action.fileId)
      };
    default:
      return state;
  }
}
