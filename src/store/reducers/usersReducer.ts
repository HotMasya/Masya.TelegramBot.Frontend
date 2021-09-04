import { createReducer } from 'typesafe-actions';
import * as actions from '../actions';
import { UserView } from '../../models/UserView';
import { RootAction } from '..';

export type UsersState = {
  users?: UserView[];
  usersToUpdate?: UserView[];
  usersLoadError?: Error;
  usersSaveError?: Error;
  hasChanges?: boolean;
};

const initialState: UsersState = {};

export const usersReducer = createReducer<UsersState, RootAction>(initialState)
  .handleAction(actions.setUsers, (state, action) => ({
    ...state,
    users: action.payload,
    usersToUpdate: JSON.parse(JSON.stringify(action.payload)),
  }))
  .handleAction(actions.loadUsersError, (state, action) => ({
    ...state,
    usersLoadError: action.payload,
  }))
  .handleAction(actions.saveUsersError, (state, action) => ({
    ...state,
    usersSaveError: action.payload,
  }))
  .handleAction(actions.updateUser, (state, action) => {
    const user = state.usersToUpdate?.find((u) => u.id === action.payload.id);

    if (!user) {
      return state;
    }

    user.note = action.payload.note ?? user.note;
    user.isBlocked = action.payload.isBlocked ?? user.isBlocked;
    user.isIgnored = action.payload.isIgnored ?? user.isIgnored;
    user.permission = action.payload.permission ?? user.permission;
    user.blockReason = action.payload.blockReason ?? user.blockReason;

    if (JSON.stringify(state.users) == JSON.stringify(state.usersToUpdate)) {
      return { ...state, hasChanges: false };
    }

    return { ...state, hasChanges: true };
  })
  .handleAction(actions.resetUsers, (state) => ({
    ...state,
    usersToUpdate: JSON.parse(JSON.stringify(state.users)),
    hasChanges: false,
  }))
  .handleAction(actions.saveUsersSuccess, (state) => ({
    ...state,
    users: JSON.parse(JSON.stringify(state.usersToUpdate)),
    hasChanges: false,
  }));
