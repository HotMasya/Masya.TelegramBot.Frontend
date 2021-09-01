import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import accountReducer from './accountReducer';
import { botSettingsReducer } from './botSettingsReducer';
import commandReducer from './commandReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
  account: accountReducer,
  commands: commandReducer,
  botStatus: botSettingsReducer,
  users: usersReducer,
});

export type RootState = StateType<typeof rootReducer>;
