import ContractServices from '@open-bucket/contracts';
import { notification } from 'antd';

export const GET_ACCOUNTS = 'GET_ACCOUNTS';
export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS';
export const GET_ACCOUNTS_FAIL = 'GET_ACCOUNTS_FAIL';

export const getAccounts = () => async (dispatch) => {
  try {
    const accounts = await ContractServices.getAccountsP();
    dispatch({ type: GET_ACCOUNTS_SUCCESS, accounts });
  } catch (error) {
    dispatch({ type: GET_ACCOUNTS_FAIL, error });
    notification.error({
      message: 'Could not get contracts'
    });
  }
};
