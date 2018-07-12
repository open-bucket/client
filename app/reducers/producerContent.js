import { SET_SELECTED_PRODUCER } from '../actions/producerContent';

const INITIAL_STATE = {
  selectedProducer: null,
  isEditingName: false
};

export default function consumer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SELECTED_PRODUCER:
      return { ...state, selectedProducer: action.selectedProducer, isEditingName: false };
    default:
      return state;
  }
}
