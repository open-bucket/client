import { GET_PRODUCERS_SUCCESS, SET_IS_VISIBLE_CREATE_PRODUCER_FORM } from '../actions/producer';

const INITIAL_STATE = {
  producers: [],
  isVisibleCreateProducerForm: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCERS_SUCCESS:
      return { ...state, producers: action.producers, isVisibleCreateProducerForm: false };
    case SET_IS_VISIBLE_CREATE_PRODUCER_FORM:
      return { ...state, isVisibleCreateProducerForm: action.isVisibleCreateProducerForm };
    default:
      return state;
  }
}
