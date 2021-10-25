import { Agency } from '../../models/Agency';
import { createStandardAction } from 'typesafe-actions';
import { AgencyActionTypes } from '../action-types';
import { Log } from '../../models/Log';

export const loadAgency = createStandardAction(AgencyActionTypes.LOAD_AGENCY)();
export const loadAgencyError = createStandardAction(
  AgencyActionTypes.LOAD_AGENCY_ERROR,
)<Error>();
export const setAgency = createStandardAction(
  AgencyActionTypes.SET_AGENCY,
)<Agency>();

export const loadImportsLogs = createStandardAction(
  AgencyActionTypes.LOAD_IMPORTS_LOGS,
)();
export const loadImportsLogsSuccess = createStandardAction(
  AgencyActionTypes.LOAD_IMPORTS_LOGS_SUCCESS,
)<Log[]>();
export const loadImportsLogsError = createStandardAction(
  AgencyActionTypes.LOAD_IMPORTS_LOGS_ERROR,
)<Error>();

export const saveAgency = createStandardAction(AgencyActionTypes.SAVE_AGENCY)();
export const saveAgencySuccess = createStandardAction(
  AgencyActionTypes.SAVE_AGENCY_SUCCESS,
)();
export const saveAgencyError = createStandardAction(
  AgencyActionTypes.SAVE_AGENCY_ERROR,
)<Error>();

export const updateAgency = createStandardAction(
  AgencyActionTypes.UPDATE_AGENCY,
)<Partial<Agency>>();
export const resetAgency = createStandardAction(
  AgencyActionTypes.RESET_AGENCY,
)();

export const removeAgent = createStandardAction(
  AgencyActionTypes.REMOVE_AGENT,
)<number>();
