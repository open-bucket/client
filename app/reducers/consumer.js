import { GET_CONSUMERS_SUCCESS } from '../actions/consumer';

const INITIAL_STATE = {
  consumers: []
};

export default function consumer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CONSUMERS_SUCCESS:
      return { ...state, consumers: action.consumers };
    default:
      return state;
  }
}
