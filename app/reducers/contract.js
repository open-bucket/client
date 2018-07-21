import { GET_ACCOUNTS_SUCCESS } from '../actions/contract';

const INITIAL_STATE = {
  accounts: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.accounts };
    default:
      return state;
  }
}
