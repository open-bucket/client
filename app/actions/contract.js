import ContractServices from '@open-bucket/contracts';

export const GET_ACCOUNTS = 'GET_ACCOUNTS';
export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS';
export const GET_ACCOUNTS_FAIL = 'GET_ACCOUNTS_FAIL';

export const getAccounts = () => async (dispatch) => {
  // try {
  const accounts = await ContractServices.getAccountsP();
  dispatch({ type: GET_ACCOUNTS_SUCCESS, accounts });
  // } catch (error) {
  // dispatch({ type: GET_ACCOUNTS_FAIL, error });
  // }
};
