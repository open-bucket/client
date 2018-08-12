import {
  SET_SELECTED_PRODUCER_ID,
  SET_VISIBLE_ACTIVATE_PRODUCER_FORM,
  GET_SPACE_STATUS_SUCCESS,
  GET_PRODUCER_BALANCE_SUCCESS,
  SET_IS_WITHDRAWING_PRODUCER,
  SET_IS_EDITING_PRODUCER_NAME,
  SET_IS_EDITING_PRODUCER_CONFIGS,
  GET_PRODUCER_CONFIGS_SUCCESS,
  UPDATE_PRODUCER_CONFIGS_SUCCESS
} from '../actions/producerContent';

const INITIAL_STATE = {
  selectedProducerId: null,
  isEditingName: false,
  isVisibleActivationForm: false,
  spaceLimit: 0,
  actualSize: 0,
  availableSpace: 0,
  balance: 0,
  isWithdrawingProducer: false,
  isEditingConfigs: false,
  configs: {}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SELECTED_PRODUCER_ID:
      return { ...state,
        selectedProducerId: action.selectedProducerId,
        isEditingName: false,
        isEditingConfigs: false
      };
    case SET_IS_EDITING_PRODUCER_NAME:
      return { ...state, isEditingName: action.isEditingName };
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
    case SET_IS_WITHDRAWING_PRODUCER:
      return {
        ...state,
        isWithdrawingProducer: action.isWithdrawingProducer
      };
    case SET_IS_EDITING_PRODUCER_CONFIGS:
      return {
        ...state,
        isEditingConfigs: action.isEditingConfigs
      };
    case GET_PRODUCER_CONFIGS_SUCCESS:
    case UPDATE_PRODUCER_CONFIGS_SUCCESS:
      return {
        ...state,
        configs: action.configs
      };
    default:
      return state;
  }
}
