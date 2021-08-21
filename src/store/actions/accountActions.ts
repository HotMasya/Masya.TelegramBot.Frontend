import { User } from '../../models/User';
import { createStandardAction } from 'typesafe-actions';
import { AccountActionTypes } from '../action-types';
import { Tokens } from '../../models/Token';
import { AuthModel } from '../../models/Auth';

export const checkPhone = createStandardAction(
  AccountActionTypes.CHECK_PHONE,
)<string>();
export const checkPhoneSuccess = createStandardAction(
  AccountActionTypes.CHECK_PHONE_SUCCESS,
)();
export const checkPhoneFailure = createStandardAction(
  AccountActionTypes.CHECK_PHONE_FAILURE,
)<Error>();
export const checkCode = createStandardAction(
  AccountActionTypes.CHECK_CODE,
)<AuthModel>();
export const checkCodeFailure = createStandardAction(
  AccountActionTypes.CHECK_CODE_FAILURE,
)<Error>();
export const getUser = createStandardAction(
  AccountActionTypes.GET_USER,
)<Tokens>();
export const setUser = createStandardAction(
  AccountActionTypes.SET_USER,
)<User>();
export const clearUser = createStandardAction(AccountActionTypes.CLEAR_USER)();
export const userError = createStandardAction(
  AccountActionTypes.ERROR,
)<Error>();
export const setTokens = createStandardAction(
  AccountActionTypes.TOKEN_SET,
)<Tokens>();
export const tokenError = createStandardAction(
  AccountActionTypes.TOKEN_ERROR,
)<Error>();
export const tokenRefresh = createStandardAction(
  AccountActionTypes.TOKEN_REFRESH,
)<string>();
export const tokenRefreshSuccess = createStandardAction(
  AccountActionTypes.TOKEN_REFRESH_SUCCESS,
)<string>();
export const tokenRefreshError = createStandardAction(
  AccountActionTypes.TOKEN_REFRESH_ERROR,
)<Error>();
