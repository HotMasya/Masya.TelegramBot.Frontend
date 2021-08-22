import { Dispatch, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Command } from '../models/Command';
import { actions, RootAction } from '../store';
import { RootState } from '../store/reducers';

export const useCommands = () => {
  const commandsState = useSelector(
    (state: RootState) => state.commands,
  );
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const loadCommands = useCallback(
    () => dispatch(actions.loadCommands()),
    [dispatch],
  );
  const updateCommand = useCallback(
    (model: Partial<Command>) => dispatch(actions.addCommandUpdate(model)),
    [dispatch],
  );
  const commands = commandsState.commandsForUpdate;
  const hasCommandsUpdate = commandsState.hasUpdates;

  return { commands, hasCommandsUpdate, loadCommands, updateCommand };
};
