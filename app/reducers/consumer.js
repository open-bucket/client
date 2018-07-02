import { GET_CONSUMERS_SUCCESS, SET_SELECTED_CONSUMER, UPDATE_CONSUMER_SUCCESS, SET_IS_EDITING_ADDRESS, UPLOAD_SUCCESS } from '../actions/consumer';

const INITIAL_STATE = {
  consumers: [],
  selectedConsumer: null,
  isEditingAddress: false
};

export default function consumer(state = INITIAL_STATE, action) {
  let consumers = null;
  let selectedConsumer = null;
  switch (action.type) {
    case GET_CONSUMERS_SUCCESS:
      return { ...state, consumers: action.consumers };
    case SET_SELECTED_CONSUMER:
      return { ...state, selectedConsumer: action.selectedConsumer };
    case UPDATE_CONSUMER_SUCCESS:
      consumers = state.consumers.map(c => (c.id === action.consumer.id ? action.consumer : c));
      return { ...state, consumers, selectedConsumer: action.consumer, isEditingAddress: false };
    case SET_IS_EDITING_ADDRESS:
      return { ...state, isEditingAddress: action.isEditingAddress };
    case UPLOAD_SUCCESS:
      consumers = state.consumers.map(c => (c.id === action.file.consumerId ?
        { ...c, Files: [...c.Files, action.file] } : c));
      selectedConsumer = state.selectedConsumer.id === action.file.consumerId ?
        { ...state.selectedConsumer, Files: [...state.selectedConsumer.Files, action.file] } :
        state.selectedConsumer;
      return { ...state, consumers, selectedConsumer };
    default:
      return state;
  }
}
