import { Dispatch, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootAction } from '../store';
import { RootState } from '../store/reducers';
import * as actions from '../store/actions';
import { Agency } from '../models/Agency';

export const useAgency = () => {
  const agencyState = useSelector((state: RootState) => state.agency);
  const dispatch = useDispatch<Dispatch<RootAction>>();

  const agency = agencyState.agencyToUpdate;
  const hasUpdates = agencyState.hasUpdates;
  const loadAgency = useCallback(
    () => dispatch(actions.loadAgency()),
    [dispatch],
  );
  const setAgency = useCallback(
    (agency: Agency) => dispatch(actions.setAgency(agency)),
    [dispatch],
  );
  const saveAgency = useCallback(
    () => dispatch(actions.saveAgency()),
    [dispatch],
  );
  const updateAgency = useCallback(
    (agency: Partial<Agency>) => dispatch(actions.updateAgency(agency)),
    [dispatch],
  );
  const resetAgency = useCallback(
    () => dispatch(actions.resetAgency()),
    [dispatch],
  );
  const removeAgent = useCallback(
    (id: number) => dispatch(actions.removeAgent(id)),
    [dispatch],
  );

  return {
    agency,
    hasUpdates,
    removeAgent,
    loadAgency,
    setAgency,
    saveAgency,
    updateAgency,
    resetAgency,
    loadings: {
      loading: agencyState.loading,
      loadingSave: agencyState.loadingSave,
    },
    errors: {
      saveError: agencyState.saveError,
    },
  };
};
