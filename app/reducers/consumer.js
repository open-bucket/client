import { GET_CONSUMERS_SUCCESS, SET_SELECTED_CONSUMER } from '../actions/consumer';

const INITIAL_STATE = {
  consumers: [],
  selectedConsumer: null
};

export default function consumer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CONSUMERS_SUCCESS:
      return { ...state, consumers: action.consumers };
    case SET_SELECTED_CONSUMER:
      return { ...state, selectedConsumer: action.selectedConsumer };
    default:
      return state;
  }
}
