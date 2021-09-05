import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import accountReducer from './accountReducer';
import { agencyReducer } from './agencyReducer';
import { botSettingsReducer } from './botSettingsReducer';
import commandReducer from './commandReducer';
import { themeReducer } from './themeReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
  account: accountReducer,
  commands: commandReducer,
  botStatus: botSettingsReducer,
  users: usersReducer,
  theme: themeReducer,
  agency: agencyReducer,
});

export type RootState = StateType<typeof rootReducer>;
