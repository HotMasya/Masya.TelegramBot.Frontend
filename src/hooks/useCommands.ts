import { Dispatch, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Command } from '../models/Command';
import { actions, RootAction } from '../store';
import { RootState } from '../store/reducers';

export const useCommands = () => {
  const commands = useSelector(
    (state: RootState) => state.commands,
  ).commandsForUpdate;
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const loadCommands = useCallback(
    () => dispatch(actions.loadCommands()),
    [dispatch],
  );
  const updateCommand = useCallback(
    (model: Partial<Command>) => dispatch(actions.addCommandUpdate(model)),
    [dispatch],
  );
  return { commands, loadCommands, updateCommand };
};
