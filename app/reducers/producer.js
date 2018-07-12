import { GET_PRODUCERS_SUCCESS } from '../actions/producer';

const INITIAL_STATE = {
  producers: []
};

export default function consumer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCERS_SUCCESS:
      return { ...state, producers: action.producers };
    default:
      return state;
  }
}
