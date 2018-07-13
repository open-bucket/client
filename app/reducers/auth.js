import { SET_USER } from '../actions/auth';

const INITIAL_STATE = {
  user: {
    id: undefined,
    username: ''
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
