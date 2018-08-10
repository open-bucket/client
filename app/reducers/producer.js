import {
  GET_PRODUCERS_SUCCESS,
  SET_IS_VISIBLE_CREATE_PRODUCER_FORM,
  START_PRODUCER_SUCCESS,
  START_PRODUCER_FAIL,
  START_PRODUCER,
  STOP_PRODUCER,
  STOP_PRODUCER_SUCCESS,
  STOP_PRODUCER_FAIL,
  UPDATE_PRODUCER,
  UPDATE_PRODUCER_SUCCESS,
  UPDATE_PRODUCER_FAIL
} from '../actions/producer';

const INITIAL_STATE = {
  producers: [],
  isVisibleCreateProducerForm: false,
  // ids of starting producers
  startingProducers: [],
  // ids of running producers
  runningProducerContexts: [],
  // ids of stopping producer
  stoppingProducers: [],
  updatingProducerIds: []
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
    case STOP_PRODUCER:
      return {
        ...state,
        stoppingProducers: [...state.stoppingProducers, producerId]
      };
    case STOP_PRODUCER_SUCCESS:
      return {
        ...state,
        runningProducerContexts: state.runningProducerContexts
          .filter(({ producerId }) => producerId !== action.producerId),
        stoppingProducers: state.stoppingProducers
          .filter(pId => pId !== action.producerId)
      };
    case STOP_PRODUCER_FAIL:
      return {
        ...state,
        stoppingProducers: state.stoppingProducers
          .filter(pId => pId !== action.producerId)
      };
    case UPDATE_PRODUCER:
      return {
        ...state,
        updatingProducerIds: [...state.updatingProducerIds, action.producer.id]
      };
    case UPDATE_PRODUCER_SUCCESS:
      return {
        ...state,
        updatingProducerIds: state.updatingProducerIds.filter(id => id !== action.producer.id),
        producers: state.producers.map(p => (p.id === action.producer.id ? action.producer : p))
      };
    case UPDATE_PRODUCER_FAIL:
      return {
        ...state,
        updatingProducerIds: state.updatingProducerIds.filter(id => id !== action.producer.id)
      };
    default:
      return state;
  }
}
