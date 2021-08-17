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
};

const initialState: AccountState = {
  checkPhoneSuccess: false,
  tokens: {
    accessToken: localStorage.getItem('x-access-token'),
    refreshToken: localStorage.getItem('x-refresh-token'),
  },
};

const accountReducer = createReducer<AccountState, RootAction>(initialState)
  .handleAction(actions.setUser, (state, action) => ({
    ...state,
    user: action.payload,
    checkCodeError: undefined,
    checkPhoneError: undefined,
    userError: undefined,
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
  }))
  .handleAction(actions.checkPhoneSuccess, (state) => ({
    ...state,
    checkPhoneSuccess: true,
    checkCodeError: undefined,
    checkPhoneError: undefined,
    userError: undefined,
  }))
  .handleAction(actions.checkPhoneFailure, (state, action) => ({
    ...state,
    checkPhoneError: action.payload,
    checkPhoneSuccess: false,
  }))
  .handleAction(actions.checkCodeFailure, (state, action) => ({
    ...state,
    checkCodeError: action.payload,
  }))
  .handleAction(actions.setTokens, (state, action) => ({
    ...state,
    tokens: action.payload,
    checkCodeError: undefined,
    checkPhoneError: undefined,
    userError: undefined,
  }));

export default accountReducer;
