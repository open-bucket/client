import { SET_CONSUMERS } from '../actions/consumer';

const INITIAL_STATE = {
  consumers: []
};

export default function consumer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CONSUMERS:
      return { ...state, consumers: action.consumers };
    default:
      return state;
  }
}
