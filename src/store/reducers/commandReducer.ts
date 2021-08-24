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
  cmd1.name = cmd2?.name ?? cmd1.name;
  cmd1.isEnabled = cmd2?.isEnabled ?? cmd1.isEnabled;
  cmd1.displayInMenu = cmd2?.displayInMenu ?? cmd1.displayInMenu;
  cmd1.permission = cmd2?.permission ?? cmd1.permission;
};

const areCommandsEqual = (cmd1: Partial<Command>, cmd2: Partial<Command>) => {
  return (
    cmd1.name === cmd2?.name &&
    cmd1.displayInMenu === cmd2?.displayInMenu &&
    cmd1.isEnabled === cmd2?.isEnabled &&
    cmd1.permission === cmd2?.permission
  );
};

const commandReducer = createReducer<CommandState, RootAction>(initialState)
  .handleAction(actions.setCommands, (state, action) => {
    state.commandsForUpdate = [];
    state.commandIdsForUpdate = [];
    state.hasUpdates = false;
    action.payload.forEach((c) => state.commandsForUpdate?.push({ ...c }));
    return {
      ...state,
      loadError: null,
      commands: action.payload,
    };
  })
  .handleAction(actions.errorCommands, (state, action) => ({
    ...state,
    loadError: action.payload,
  }))
  .handleAction(actions.saveCommandsError, (state, action) => ({
    ...state,
    saveCommandsError: action.payload,
  }))
  .handleAction(actions.addCommandUpdate, (state, action) => {
    const target = state.commandsForUpdate?.find(
      (c) => c.id === action.payload.id || c.newAliasId === action.payload.id,
    );
    if (target === undefined) {
      return state;
    }
    mapCommands(target, action.payload);
    const targetIndex = state.commandIdsForUpdate?.findIndex(
      (id) => id === action.payload.id,
    );
    if (targetIndex === undefined || targetIndex < 0) {
      state.commandIdsForUpdate?.push(target.id || target.newAliasId || 0);
    }
    const origin = state.commands?.find(
      (c) => c.id === action.payload.id || c.newAliasId === action.payload.id,
    );
    if (
      origin &&
      targetIndex !== undefined &&
      targetIndex >= 0 &&
      areCommandsEqual(origin, target)
    ) {
      state.commandIdsForUpdate?.splice(targetIndex, 1);
      if (state.commandIdsForUpdate && state.commandIdsForUpdate.length === 0) {
        return { ...state, hasUpdates: false };
      }
    }
    return { ...state, hasUpdates: true, saveCommandsError: null };
  })
  .handleAction(actions.resetCommandsUpdates, (state) => {
    if (!state.commands) {
      return state;
    }

    state.commandsForUpdate = [];
    state.commandIdsForUpdate = [];
    state.hasUpdates = false;

    state.commands.forEach((c) => state.commandsForUpdate?.push({ ...c }));
    return { ...state };
  })
  .handleAction(actions.addCommand, (state, action) => {
    state.commandsForUpdate?.push(action.payload);
    return { ...state, hasUpdates: true, saveCommandsError: null };
  })
  .handleAction(actions.removeCommand, (state, action) => {
    const targetIndex = state.commandsForUpdate?.findIndex(
      (c) => c.id === action.payload || c.newAliasId === action.payload,
    );
    if (targetIndex === undefined || targetIndex === -1) {
      return state;
    }

    state.commandsForUpdate?.splice(targetIndex, 1);
    const targetIdIndex = state.commandIdsForUpdate?.findIndex(
      (c) => c === action.payload,
    );

    if (targetIdIndex !== undefined && targetIndex !== -1) {
      state.commandIdsForUpdate?.splice(targetIdIndex, 1);
    }

    let hasUpdates = false;
    if (
      state.commandsForUpdate &&
      state.commands &&
      state.commandsForUpdate?.length === state.commands?.length
    ) {
      for (let i = 0; i < state.commands.length; i++) {
        if (!areCommandsEqual(state.commands[i], state.commandsForUpdate[i])) {
          hasUpdates = true;
          break;
        }
      }
    } else if (state.commandsForUpdate?.length !== state.commands?.length) {
      hasUpdates = true;
    }

    return { ...state, hasUpdates, saveCommandsError: null };
  })
  .handleAction(actions.resetErrors, (state) => ({
    ...state,
    saveCommandsError: undefined,
    loadError: undefined,
  }));

export default commandReducer;
