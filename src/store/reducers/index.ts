import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import accountReducer from './accountReducer';
import commandReducer from './commandReducer';

export const rootReducer = combineReducers({
  account: accountReducer,
  commands: commandReducer,
});

export type RootState = StateType<typeof rootReducer>;
