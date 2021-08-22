import { createReducer } from 'typesafe-actions';
import * as actions from '../actions';
import { Command } from '../../models/Command';
import { RootAction } from '..';

export type CommandState = {
  commands?: Command[] | null;
  loadError?: Error | null;
  updateCommandError?: Error | null;
  hasUpdates?: boolean;
  commandIdsForUpdate?: number[];
  commandsForUpdate?: Partial<Command>[];
};

const initialState: CommandState = {
  hasUpdates: false,
};

const commandReducer = createReducer<CommandState, RootAction>(initialState)
  .handleAction(actions.setCommands, (_state, action) => {
    const commandsForUpdate: Command[] = [];
    action.payload.forEach((c) => {
      commandsForUpdate.push({...c});
      c.aliases.forEach((a) => {
        commandsForUpdate.push({...a});
      });
    });

    return {
      loadError: null,
      commands: action.payload,
      commandsForUpdate,
      commandIdsForUpdate: [],
    };
  })
  .handleAction(actions.errorCommands, (state, action) => ({
    ...state,
    loadError: action.payload,
  }))
  .handleAction(actions.addCommandUpdate, (state, action) => {
    const target = state.commandsForUpdate?.find(
      (t) => t.id === action.payload.id,
    );
    if (!target) return {...state};
    const targetIndex = state.commandIdsForUpdate?.findIndex(id => id === target?.id)
    target.name = action.payload.name ?? target.name;
    target.isEnabled = action.payload.isEnabled ?? target.isEnabled;
    target.displayInMenu =
      action.payload.displayInMenu ?? target.displayInMenu;
    target.permission = action.payload.permission ?? target.permission;

    if(targetIndex === undefined || targetIndex < 0 ) state.commandIdsForUpdate?.push(target.id || 0);

    const commands = state.commands || [];
    const command =
    commands.find((c) => c.id === action.payload.id) ||
    commands
      .find((c) => c.aliases.find((a) => a.id === action.payload.id))
      ?.aliases.find((a) => a.id === action.payload.id);

    let hasUpdates = true;
    if(command &&
        targetIndex !== undefined && targetIndex >= 0 &&
       command.name === target?.name &&
       command.displayInMenu === target?.displayInMenu &&
       command.isEnabled === target?.isEnabled &&
       command.permission === target?.permission)
    {
      state.commandIdsForUpdate?.splice(targetIndex, 1);
      if(state.commandIdsForUpdate && state.commandIdsForUpdate.length === 0)
      {
        hasUpdates = false;
      }
    }

    return { ...state, hasUpdates, lastUpdatedCommandId: action.payload.id };
  })
  .handleAction(actions.updateCommand, (state) => {
    if (!state.commandsForUpdate?.length || !state.commands?.length) {
      return { ...state, hasUpdates: false };
    }

    const commands = state.commands;
    const updates = state.commandsForUpdate;

    for (let i = 0; i < updates.length; i++) {
      const command =
        commands.find((c) => c.id === updates[i].id) ||
        commands
          .find((c) => c.aliases.find((a) => a.id === updates[i].id))
          ?.aliases.find((a) => a.id === updates[i].id);
      if (command) {
        command.name = updates[i].name ?? command.name;
        command.isEnabled = updates[i].isEnabled ?? command.isEnabled;
        command.displayInMenu =
          updates[i].displayInMenu ?? command.displayInMenu;
        command.permission = updates[i].permission ?? command.permission;
      }
    }

    return { ...state, hasUpdates: false };
  })
  .handleAction(actions.resetCommandsUpdates, (state) => {
    if(!state.commandsForUpdate || !state.commands)
    {
      return {...state};
    }

    state.commandsForUpdate = [];
    state.commandIdsForUpdate = [];
    state.hasUpdates = false;
    state.updateCommandError = null;

    state.commands.forEach(c => {
      state.commandsForUpdate?.push({...c});
      c.aliases.forEach(a => state.commandsForUpdate?.push({...a}));
    });
    
    return {...state};
  });

export default commandReducer;
