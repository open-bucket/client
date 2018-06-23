import { REGISTER, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/register';

export default function counter(state = { isBusy: true }, action) {
  switch (action.type) {
    case REGISTER:
      return { ...state, isBusy: true };
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
      return { ...state, isBusy: false };
    default:
      return state;
  }
}
