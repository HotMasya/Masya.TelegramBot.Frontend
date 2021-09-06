import { Command } from '../../models/Command';
import { createStandardAction } from 'typesafe-actions';
import { CommandActionTypes } from '../action-types';

export const loadCommands = createStandardAction(
  CommandActionTypes.LOAD_COMMANDS,
)();
export const errorCommands = createStandardAction(
  CommandActionTypes.LOAD_COMMANDS_ERROR,
)<Error>();

export const setCommands = createStandardAction(
  CommandActionTypes.SET_COMMANDS,
)<Command[]>();

export const saveCommands = createStandardAction(
  CommandActionTypes.SAVE_COMMANDS,
)();
export const saveCommandsError = createStandardAction(
  CommandActionTypes.SAVE_COMMANDS_ERROR,
)<Error>();
export const saveCommandsSuccess = createStandardAction(
  CommandActionTypes.SAVE_COMMANDS_SUCCESS,
)();

export const resetCommandsUpdates = createStandardAction(
  CommandActionTypes.RESET_COMMANDS_UPDATES,
)();
export const addCommandUpdate = createStandardAction(
  CommandActionTypes.ADD_COMMAND_UPDATE,
)<Partial<Command>>();

export const addCommand = createStandardAction(CommandActionTypes.ADD_COMMAND)<
  Partial<Command>
>();
export const removeCommand = createStandardAction(
  CommandActionTypes.REMOVE_COMMAND,
)<number>();

export const resetErrors = createStandardAction(
  CommandActionTypes.RESET_ERRORS,
)();
