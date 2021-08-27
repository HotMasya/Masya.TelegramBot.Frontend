import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import accountReducer from './accountReducer';
import { botSettingsReducer } from './botSettingsReducer';
import commandReducer from './commandReducer';

export const rootReducer = combineReducers({
  account: accountReducer,
  commands: commandReducer,
  botStatus: botSettingsReducer
});

export type RootState = StateType<typeof rootReducer>;
