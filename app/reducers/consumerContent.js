import {
  SET_IS_EDITING_CONSUMER_NAME,
  SET_SELECTED_CONSUMER_ID,
  UPDATE_CONSUMER_SUCCESS,
  SET_VISIBLE_ACTIVATE_CONSUMER_FORM,
  SET_IS_DELETING_FILE,
  GET_CONSUMER_BALANCE_SUCCESS,
  SET_IS_WITHDRAWING_CONSUMER,
  GET_FILES_SUCCESS,
  DELETE_FILE_SUCCESS,
  SET_IS_EDITING_CONSUMER_CONFIGS,
  GET_CONSUMER_CONFIGS_SUCCESS,
  UPDATE_CONSUMER_CONFIGS_SUCCESS
} from '../actions/consumerContent';

const INITIAL_STATE = {
  selectedConsumerId: null,
  isEditingName: false,
  isVisibleActivationForm: false,
  files: [],
  balance: 0,
  contractBalance: 0,
  isWithdrawingConsumer: false,
  isEditingConfigs: false,
  configs: {}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SELECTED_CONSUMER_ID:
      return { ...state,
        selectedConsumerId: action.selectedConsumerId,
        isEditingName: false,
        isEditingConfigs: false
      };
    case SET_IS_EDITING_CONSUMER_NAME:
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
    case GET_CONSUMER_BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.balance,
        contractBalance: action.contractBalance
      };
    case SET_IS_WITHDRAWING_CONSUMER:
      return {
        ...state,
        isWithdrawingConsumer: action.isWithdrawingConsumer
      };
    case SET_IS_EDITING_CONSUMER_CONFIGS:
      return {
        ...state,
        isEditingConfigs: action.isEditingConfigs
      };
    case GET_CONSUMER_CONFIGS_SUCCESS:
    case UPDATE_CONSUMER_CONFIGS_SUCCESS:
      return {
        ...state,
        configs: action.configs
      };
    default:
      return state;
  }
}
