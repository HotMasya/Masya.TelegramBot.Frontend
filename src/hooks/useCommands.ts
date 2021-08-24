import { Dispatch, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Command } from '../models/Command';
import { actions, RootAction } from '../store';
import { RootState } from '../store/reducers';

export const useCommands = () => {
  const commandsState = useSelector((state: RootState) => state.commands);
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const commands = commandsState.commandsForUpdate;
  const loadCommands = useCallback(
    () => dispatch(actions.loadCommands()),
    [dispatch],
  );
  const saveCommands = useCallback(
    () => dispatch(actions.saveCommands()),
    [dispatch],
  );
  const updateCommand = useCallback(
    (model: Partial<Command>) => dispatch(actions.addCommandUpdate(model)),
    [dispatch],
  );
  const hasCommandsUpdate = commandsState.hasUpdates;
  const resetCommandsUpdates = useCallback(
    () => dispatch(actions.resetCommandsUpdates()),
    [dispatch],
  );
  const addCommand = useCallback(
    (command: Partial<Command>) => dispatch(actions.addCommand(command)),
    [dispatch],
  );
  const removeCommand = useCallback(
    (commandId: number) => dispatch(actions.removeCommand(commandId)),
    [dispatch],
  );
  const errors = {
    loadError: commandsState.loadError,
    saveError: commandsState.saveCommandsError,
  };
  const resetErrors = useCallback(
    () => dispatch(actions.resetErrors()),
    [dispatch],
  );
  return {
    commands,
    hasCommandsUpdate,
    errors,
    loadCommands,
    saveCommands,
    updateCommand,
    resetCommandsUpdates,
    addCommand,
    removeCommand,
    resetErrors,
  };
};
