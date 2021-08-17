import { createReducer } from 'typesafe-actions';
import * as actions from '../actions';
import { Command } from '../../models/Command';
import { RootAction } from '..';

export type CommandState = {
  commands: Command[] | null;
  error: Error | null;
};

const initialState: CommandState = {
  commands: null,
  error: null,
};

const commandReducer = createReducer<CommandState, RootAction>(initialState)
  .handleAction(actions.setCommands, (_state, action) => ({
    error: null,
    commands: action.payload,
  }))
  .handleAction(actions.errorCommands, (state, action) => ({
    ...state,
    error: action.payload,
  }));

export default commandReducer;
