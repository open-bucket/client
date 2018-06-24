import { SET_CONSUMER_SUCCESS } from '../actions/consumerContent';

const INITIAL_STATE = {
  id: '',
  address: '',
};

export default function consumer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CONSUMER_SUCCESS:
      return { ...state, ...action.consumer };
    default:
      return state;
  }
}
