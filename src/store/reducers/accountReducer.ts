import { User } from '../../models/User';
import { createReducer } from 'typesafe-actions';
import { RootAction } from '..';
import * as actions from '../actions';
import { Tokens } from 'src/models/Token';

export type AccountState = {
  user?: User;
  tokens?: Tokens;
  userError?: Error;
  checkPhoneError?: Error;
  checkPhoneSuccess?: boolean;
  checkCodeError?: Error;
  loading?: boolean;
};

const initialState: AccountState = {
  checkPhoneSuccess: false,
  tokens: {
    accessToken: localStorage.getItem('x-access-token'),
    refreshToken: localStorage.getItem('x-refresh-token'),
  },
  loading: false,
};

const accountReducer = createReducer<AccountState, RootAction>(initialState)
  .handleAction([actions.checkCode, actions.checkPhone], (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.setUser, (state, action) => ({
    ...state,
    user: action.payload,
    checkCodeError: undefined,
    checkPhoneError: undefined,
    userError: undefined,
    loading: false,
  }))
  .handleAction(actions.clearUser, () => {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
    return {
      checkPhoneSuccess: false,
    };
  })
  .handleAction(actions.tokenRefreshError, () => {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
    return {
      checkPhoneSuccess: false,
    };
  })
  .handleAction(actions.userError, (state, action) => ({
    ...state,
    userError: action.payload,
    loading: false,
  }))
  .handleAction(actions.checkPhoneSuccess, (state) => ({
    ...state,
    checkPhoneSuccess: true,
    checkCodeError: undefined,
    checkPhoneError: undefined,
    userError: undefined,
    loading: false,
  }))
  .handleAction(actions.checkPhoneFailure, (state, action) => ({
    ...state,
    checkPhoneError: action.payload,
    checkPhoneSuccess: false,
    loading: false,
  }))
  .handleAction(actions.checkCodeFailure, (state, action) => ({
    ...state,
    checkCodeError: action.payload,
    loading: false,
  }))
  .handleAction(actions.setTokens, (state, action) => ({
    ...state,
    tokens: action.payload,
    checkCodeError: undefined,
    checkPhoneError: undefined,
    userError: undefined,
  }));

export default accountReducer;
