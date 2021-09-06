import { Dispatch, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import { RootState } from '../store/reducers';
import { RootAction } from '../store';
import { UserView } from '../models/UserView';

export const useUsers = () => {
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const usersState = useSelector((state: RootState) => state.users);
  const loadUsers = useCallback(
    () => dispatch(actions.loadUsers()),
    [dispatch],
  );
  const saveUsers = useCallback(
    () => dispatch(actions.saveUsers()),
    [dispatch],
  );
  const updateUser = useCallback(
    (user: Partial<UserView>) => dispatch(actions.updateUser(user)),
    [dispatch],
  );
  const resetUsers = useCallback(
    () => dispatch(actions.resetUsers()),
    [dispatch],
  );
  const removeUser = useCallback(
    (id: number) => dispatch(actions.removeUser(id)),
    [dispatch],
  );
  return {
    users: usersState.usersToUpdate,
    hasUpdates: usersState.hasChanges,
    loadings: {
      loading: usersState.loading,
      loadingSave: usersState.loadingSave,
    },
    loadUsers,
    saveUsers,
    updateUser,
    resetUsers,
    removeUser,
  };
};
