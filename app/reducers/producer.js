import { GET_PRODUCERS_SUCCESS,
  SET_IS_VISIBLE_CREATE_PRODUCER_FORM,
  START_PRODUCER_SUCCESS,
  START_PRODUCER_FAIL,
  START_PRODUCER } from '../actions/producer';

const INITIAL_STATE = {
  producers: [],
  isVisibleCreateProducerForm: false,
  // ids of starting producers
  startingProducers: [],
  // ids of running producers
  runningProducerContexts: []
};

export default function (state = INITIAL_STATE, action) {
  const { context, producerId } = action;

  switch (action.type) {
    case GET_PRODUCERS_SUCCESS:
      return { ...state, producers: action.producers, isVisibleCreateProducerForm: false };
    case SET_IS_VISIBLE_CREATE_PRODUCER_FORM:
      return { ...state, isVisibleCreateProducerForm: action.isVisibleCreateProducerForm };
    case START_PRODUCER:
      return { ...state, startingProducers: [...state.startingProducers, producerId] };
    case START_PRODUCER_SUCCESS:
      return {
        ...state,
        startingProducers: state.startingProducers.filter(pId => pId !== context.producerId),
        runningProducerContexts: [...state.runningProducerContexts, context]
      };
    case START_PRODUCER_FAIL:
      return {
        ...state,
        startingProducers: state.startingProducers.filter(p => p.id !== producerId)
      };
    default:
      return state;
  }
}
