import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import accountReducer from './accountReducer';
import { agenciesReducer } from './agenciesReducer';
import { agencyReducer } from './agencyReducer';
import { botSettingsReducer } from './botSettingsReducer';
import commandReducer from './commandReducer';
import { minmaxReducer } from './minmaxReducer';
import { themeReducer } from './themeReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
  account: accountReducer,
  commands: commandReducer,
  botStatus: botSettingsReducer,
  users: usersReducer,
  theme: themeReducer,
  agency: agencyReducer,
  minMaxValues: minmaxReducer,
  agenciesReducer: agenciesReducer,
});

export type RootState = StateType<typeof rootReducer>;
