import { UserView } from '../../models/UserView';
import { createStandardAction } from 'typesafe-actions';
import { UsersActionTypes } from '../action-types/UsersActionTypes';

export const loadUsers = createStandardAction(UsersActionTypes.LOAD_USERS)();
export const loadUsersError = createStandardAction(
  UsersActionTypes.LOAD_USERS_ERROR,
)<Error>();
export const setUsers = createStandardAction(UsersActionTypes.SET_USERS)<
  UserView[]
>();
export const saveUsers = createStandardAction(UsersActionTypes.SAVE_USERS)();
export const saveUsersSuccess = createStandardAction(
  UsersActionTypes.SAVE_USERS_SUCCESS,
)();
export const saveUsersError = createStandardAction(
  UsersActionTypes.SAVE_USERS_ERROR,
)<Error>();
export const updateUser = createStandardAction(UsersActionTypes.UPDATE_USER)<
  Partial<UserView>
>();
export const resetUsers = createStandardAction(UsersActionTypes.RESET_USERS)();
export const removeUser = createStandardAction(
  UsersActionTypes.REMOVE_USER,
)<number>();
