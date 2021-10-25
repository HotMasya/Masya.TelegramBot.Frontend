import { createStandardAction } from 'typesafe-actions';
import { Agency } from '../../models';
import { AgenciesActionTypes } from '../action-types';

export const loadAgencies = createStandardAction(
  AgenciesActionTypes.LOAD_AGENCIES,
)();
export const loadAgenciesSuccess = createStandardAction(
  AgenciesActionTypes.LOAD_AGENCIES_SUCCESS,
)<Agency[]>();
export const loadAgenciesError = createStandardAction(
  AgenciesActionTypes.LOAD_AGENCIES_ERROR,
)<Error>();
export const saveAgencies = createStandardAction(
  AgenciesActionTypes.SAVE_AGENCIES,
)();
export const saveAgenciesSuccess = createStandardAction(
  AgenciesActionTypes.SAVE_AGENCIES_SUCCESS,
)();
export const saveAgenciesError = createStandardAction(
  AgenciesActionTypes.SAVE_AGENCIES_ERROR,
)<Error>();
export const addAgency = createStandardAction(AgenciesActionTypes.ADD_AGENCY)<
  Partial<Agency>
>();
export const removeAgency = createStandardAction(
  AgenciesActionTypes.REMOVE_AGENCY,
)<number>();
export const updateAgencies = createStandardAction(
  AgenciesActionTypes.UPDATE_AGENCY,
)<Partial<Agency>>();
export const removeAgenciesUpdates = createStandardAction(
  AgenciesActionTypes.REMOVE_AGENCIES_UPDATES,
)();
