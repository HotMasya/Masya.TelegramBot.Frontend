import { Agency } from 'src/models/Agency';
import { createReducer } from 'typesafe-actions';
import { RootAction } from '..';
import * as actions from '../actions';

export type AgencyState = {
  agency?: Agency;
  agencyToUpdate?: Agency;
  loading?: boolean;
  loadingSave?: boolean;
  hasUpdates: boolean;
  loadError?: Error;
  saveError?: Error;
};

const initialState: AgencyState = {
  hasUpdates: false,
};

export const agencyReducer = createReducer<AgencyState, RootAction>(
  initialState,
)
  .handleAction(actions.loadAgency, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.saveAgency, (state) => ({
    ...state,
    loadingSave: true,
  }))
  .handleAction(actions.setAgency, (state, action) => ({
    ...state,
    agency: action.payload,
    agencyToUpdate: JSON.parse(JSON.stringify(action.payload)),
    loading: false,
    hasUpdates: false,
  }))
  .handleAction(actions.saveAgencyError, (state, action) => ({
    ...state,
    saveError: action.payload,
    loadingSave: false,
  }))
  .handleAction(actions.removeAgent, (state, action) => {
    if (!state?.agencyToUpdate?.agents?.length) {
      return state;
    }

    const target = state.agencyToUpdate.agents.find(
      (a) => a.id === action.payload,
    );
    if (target) {
      target.willBeDeleted = true;
    }

    return { ...state, hasUpdates: true };
  })
  .handleAction(actions.loadAgencyError, (state, action) => ({
    ...state,
    loadError: action.payload,
  }))
  .handleAction(actions.saveAgencySuccess, (state) => ({
    agency: { ...state.agencyToUpdate } as Agency,
    ...state,
    loadingSave: false,
    hasUpdates: false,
  }))
  .handleAction(actions.updateAgency, (state, action) => {
    if (!state.agencyToUpdate) return state;

    state.agencyToUpdate.name =
      action.payload.name ?? state.agencyToUpdate?.name;
    state.agencyToUpdate.description =
      action.payload.description ?? state.agencyToUpdate?.description;
    state.agencyToUpdate.importUrl =
      action.payload.importUrl ?? state.agencyToUpdate?.importUrl;
    state.agencyToUpdate.registrationKey =
      action.payload.registrationKey ?? state.agencyToUpdate?.registrationKey;
    state.agencyToUpdate.isRegWithoutAdmin =
      action.payload.isRegWithoutAdmin ??
      state.agencyToUpdate?.isRegWithoutAdmin;

    if (JSON.stringify(state.agencyToUpdate) == JSON.stringify(state.agency)) {
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
  .handleAction(actions.resetAgency, (state) => ({
    ...state,
    hasUpdates: false,
    agencyToUpdate: JSON.parse(JSON.stringify(state.agency)) as Agency,
  }));
