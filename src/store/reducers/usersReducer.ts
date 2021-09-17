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
  loading?: boolean;
  loadingSave?: boolean;
};

const initialState: UsersState = {};

export const usersReducer = createReducer<UsersState, RootAction>(initialState)
  .handleAction(actions.loadUsers, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.saveUsers, (state) => ({
    ...state,
    loadingSave: true,
  }))
  .handleAction(actions.setUsers, (state, action) => ({
    ...state,
    users: action.payload,
    loading: false,
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
    loadingSave: false,
    hasChanges: false,
  }))
  .handleAction(actions.removeUser, (state, action) => ({
    ...state,
    usersToUpdate: state.usersToUpdate?.filter((u) => u.id !== action.payload),
    hasChanges: true,
  }));
