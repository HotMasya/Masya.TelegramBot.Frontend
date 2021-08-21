import { createReducer } from 'typesafe-actions';
import * as actions from '../actions';
import {  Command } from '../../models/Command';
import { RootAction } from '..';
import { DiscFullSharp } from '@material-ui/icons';

export type CommandState = {
  commands?: Command[] | null;
  loadError?: Error | null;
  updateCommandError?: Error | null;
  hasUpdates?: boolean;
  commandsForUpdate?: Partial<Command>[];
};

const initialState: CommandState = {
  hasUpdates: false,
};

const commandReducer = createReducer<CommandState, RootAction>(initialState)
  .handleAction(actions.setCommands, (_state, action) => {
    const commandsForUpdate: Command[] = [];
    action.payload.forEach(c => {
      commandsForUpdate.push(c);
      c.aliases.forEach(a => {
        commandsForUpdate.push(a);
      });
    });

    return {
      loadError: null,
      commands: action.payload,
      commandsForUpdate,
    };
  })
  .handleAction(actions.errorCommands, (state, action) => ({
    ...state,
    loadError: action.payload,
  }))
  .handleAction(actions.addCommandUpdate, (state, action) => {
    let target = state.commandsForUpdate?.find(t => t.id === action.payload.id);
    if(target)
    {
      target.name = action.payload.name ?? target.name;
      target.isEnabled = action.payload.isEnabled ?? target.isEnabled;
      target.displayInMenu = action.payload.displayInMenu ?? target.displayInMenu;
      target.permission = action.payload.permission ?? target.permission;
    }
    else
    {
      state.commandsForUpdate?.push(action.payload);
    }
    console.log(target);
    return {...state, hasUpdates: true};
  })
  .handleAction(actions.updateCommand, (state) => {
    if(!state.commandsForUpdate?.length || !state.commands?.length)
    {
      return {...state, hasUpdates: false};
    }

    const commands = state.commands;
    const updates = state.commandsForUpdate;

    for(let i = 0; i < updates.length; i++)
    {
      let command = commands.find(c => c.id === updates[i].id) 
        || commands.find(c => c.aliases.find(a => a.id === updates[i].id))?.aliases.find(a => a.id === updates[i].id);
      if(command)
      {
        command.name = updates[i].name ?? command.name;
        command.isEnabled = updates[i].isEnabled ?? command.isEnabled;
        command.displayInMenu = updates[i].displayInMenu ?? command.displayInMenu;
        command.permission = updates[i].permission ?? command.permission;
      }
    }

    return {...state, hasUpdates: false};
  });

export default commandReducer;
