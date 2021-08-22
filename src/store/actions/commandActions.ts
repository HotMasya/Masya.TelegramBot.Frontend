import { Command } from '../../models/Command';
import { createStandardAction } from 'typesafe-actions';
import { CommandActionTypes } from '../action-types';

export const loadCommands = createStandardAction(
  CommandActionTypes.LOAD_COMMANDS,
)();
export const setCommands = createStandardAction(
  CommandActionTypes.SET_COMMANDS,
)<Command[]>();
export const saveCommands = createStandardAction(
  CommandActionTypes.SAVE_COMMANDS,
)();
export const saveSuccess = createStandardAction(
  CommandActionTypes.SAVE_SUCCESS,
)();
export const errorCommands = createStandardAction(
  CommandActionTypes.ERROR,
)<Error>();
export const updateCommand = createStandardAction(
  CommandActionTypes.UPDATE_COMMANDS,
)();
export const removeCommand = createStandardAction(
  CommandActionTypes.REMOVE_COMMAND
)<number>();
export const resetCommandsUpdates = createStandardAction(
  CommandActionTypes.RESET_COMMANDS_UPDATES
)();
export const addCommandUpdate = createStandardAction(
  CommandActionTypes.ADD_COMMAND_UPDATE,
)<Partial<Command>>();
