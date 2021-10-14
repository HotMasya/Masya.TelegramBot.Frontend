import { createReducer } from 'typesafe-actions';
import { RootAction } from '..';
import { Agency } from '../../models';
import * as actions from '../actions';

export type AgenciesState = {
  agencies?: Agency[];
  agenciesToUpdate?: Agency[];
  loading?: boolean;
  loadingSave?: boolean;
  loadingLogs?: boolean;
  hasUpdates: boolean;
  loadError?: Error;
  saveError?: Error;
  loadLogsError?: Error;
};

const initialState: AgenciesState = {
  hasUpdates: false,
};

export const agenciesReducer = createReducer<AgenciesState, RootAction>(
  initialState,
)
  .handleAction(actions.loadAgencies, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.saveAgencies, (state) => ({
    ...state,
    loadingSave: true,
  }))
  .handleAction(actions.loadAgenciesSuccess, (state, action) => ({
    ...state,
    agencies: action.payload,
    agenciesToUpdate: JSON.parse(JSON.stringify(action.payload)) as Agency[],
    loading: false,
    hasUpdates: false,
  }))
  .handleAction(actions.saveAgenciesError, (state, action) => ({
    ...state,
    saveError: action.payload,
    loadingSave: false,
  }))
  .handleAction(actions.removeAgency, (state, action) => {
    if (!state.agenciesToUpdate?.length) {
      return state;
    }

    const newAgencies = state.agenciesToUpdate?.filter(
      (a) => a.id === action.payload,
    );

    if (!newAgencies || newAgencies.length === state.agenciesToUpdate?.length) {
      return state;
    }

    return {
      ...state,
      agenciesToUpdate: newAgencies,
      hasUpdates: true,
    };
  })
  .handleAction(actions.loadAgenciesError, (state, action) => ({
    ...state,
    loadError: action.payload,
  }))
  .handleAction(actions.saveAgenciesSuccess, (state) => ({
    agencies: JSON.parse(JSON.stringify(state.agenciesToUpdate)),
    ...state,
    loadingSave: false,
    hasUpdates: false,
  }))
  .handleAction(actions.updateAgencies, (state, action) => {
    const target = state.agenciesToUpdate?.find(
      (a) => a.id === action.payload?.id,
    );

    if (!target) {
      return state;
    }

    target.name = action.payload?.name ?? target.name;
    target.importUrl = action.payload?.importUrl ?? target.importUrl;
    target.registrationKey =
      action.payload?.registrationKey ?? target.registrationKey;
    target.description = action.payload?.description ?? target.description;

    if (
      JSON.stringify(state.agencies) === JSON.stringify(state.agenciesToUpdate)
    ) {
      return {
        ...state,
        hasUpdates: false,
      };
    }

    return {
      ...state,
      hasUpdates: true,
    };
  })
  .handleAction(actions.removeAgenciesUpdates, (state) => ({
    ...state,
    hasUpdates: false,
    agenciesToUpdate: JSON.parse(JSON.stringify(state.agencies)),
  }));
