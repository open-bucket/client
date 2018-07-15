import { GET_CONSUMERS_SUCCESS, SET_VISIBLE_CREATE_CONSUMER_FORM } from '../actions/consumer';

const INITIAL_STATE = {
  consumers: [],
  isVisibleCreateConsumerForm: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CONSUMERS_SUCCESS:
      return { ...state,
        consumers: action.consumers,
        isVisibleCreateConsumerForm: false };
    case SET_VISIBLE_CREATE_CONSUMER_FORM:
      return { ...state, isVisibleCreateConsumerForm: action.isVisibleCreateConsumerForm };
    default:
      return state;
  }
}
