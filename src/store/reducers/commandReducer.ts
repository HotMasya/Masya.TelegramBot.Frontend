import { createReducer } from 'typesafe-actions';
import * as actions from '../actions';
import { Command } from '../../models/Command';
import { RootAction } from '..';

export type CommandState = {
  commands?: Command[] | null;
  loadError?: Error | null;
  saveCommandsError?: Error | null;
  hasUpdates?: boolean;
  commandIdsForUpdate?: number[];
  commandsForUpdate?: Partial<Command>[];
};

const initialState: CommandState = {
  hasUpdates: false,
  commandIdsForUpdate: [],
  commandsForUpdate: [],
};

const mapCommands = (cmd1: Partial<Command>, cmd2: Partial<Command>) => {
  cmd1.name = cmd2.name;
  cmd1.isEnabled = cmd2.isEnabled;
  cmd1.displayInMenu = cmd2.displayInMenu;
  cmd1.permission = cmd2.permission;
};

const commandReducer = createReducer<CommandState, RootAction>(initialState)
  .handleAction(actions.setCommands, (state, action) => {
    action.payload.forEach((c) => state.commandsForUpdate?.push({ ...c }));
    return {
      loadError: null,
      commands: action.payload,
    };
  })
  .handleAction(actions.errorCommands, (state, action) => ({
    ...state,
    loadError: action.payload,
  }))
  .handleAction(actions.addCommandUpdate, (state, action) => {
    const target = state.commandsForUpdate?.find(
      (c) => c.id === action.payload.id,
    );
    if (target === undefined) return state;
    mapCommands(target, action.payload);
    const targetIndex = state.commandIdsForUpdate?.findIndex(
      (id) => id === action.payload.id,
    );
    if (targetIndex === undefined || targetIndex < 0)
      state.commandIdsForUpdate?.push(target.id || 0);
    const origin = state.commands?.find((c) => c.id === action.payload.id);
    if (
      origin &&
      targetIndex !== undefined &&
      targetIndex >= 0 &&
      origin.name === target?.name &&
      origin.displayInMenu === target?.displayInMenu &&
      origin.isEnabled === target?.isEnabled &&
      origin.permission === target?.permission
    ) {
      state.commandIdsForUpdate?.splice(targetIndex, 1);
      if (state.commandIdsForUpdate && state.commandIdsForUpdate.length === 0) {
        return { ...state, hasUpdates: false };
      }
    }
    return { ...state, hasUpdates: true };
  })
  .handleAction(actions.resetCommandsUpdates, (state) => {
    if (!state.commandsForUpdate || !state.commands) {
      return state;
    }

    state.commandsForUpdate = [];
    state.commandIdsForUpdate = [];
    state.hasUpdates = false;

    state.commands.forEach((c) => state.commandsForUpdate?.push({ ...c }));
    return state;
  });

export default commandReducer;
