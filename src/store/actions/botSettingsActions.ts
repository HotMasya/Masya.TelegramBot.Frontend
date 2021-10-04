import { BotSettings } from '../../models/BotSettings';
import { createStandardAction } from 'typesafe-actions';
import { BotSettingsActionTypes } from '../action-types';
import { Log } from '../../models/Log';

export const loadBotSettings = createStandardAction(
  BotSettingsActionTypes.LOAD_SETTINGS,
)();
export const saveBotSettings = createStandardAction(
  BotSettingsActionTypes.SAVE_SETTINGS,
)();
export const saveBotSettingsSuccess = createStandardAction(
  BotSettingsActionTypes.SAVE_SUCCESS,
)();
export const setBotSettings = createStandardAction(
  BotSettingsActionTypes.SET_SETTINGS,
)<BotSettings>();
export const updateBotSettings = createStandardAction(
  BotSettingsActionTypes.UPDATE_SETTINGS,
)<Partial<BotSettings>>();
export const saveBotSettingsError = createStandardAction(
  BotSettingsActionTypes.SAVE_ERROR,
)<Error>();
export const loadBotSettingsError = createStandardAction(
  BotSettingsActionTypes.LOAD_ERROR,
)<Error>();
export const resetBotSettingsUpdates = createStandardAction(
  BotSettingsActionTypes.RESET_UPDATES,
)();
export const loadBotLogs = createStandardAction(
  BotSettingsActionTypes.LOAD_LOGS,
)();
export const loadBotLogsSuccess = createStandardAction(
  BotSettingsActionTypes.LOAD_LOGS_SUCCESS,
)<Log[]>();
export const loadBotLogsError = createStandardAction(
  BotSettingsActionTypes.LOAD_LOGS_ERROR,
)<Error>();
export const startImporting = createStandardAction(
  BotSettingsActionTypes.START_IMPORTING,
)();
export const startImportingSuccess = createStandardAction(
  BotSettingsActionTypes.START_IMPORTING_SUCCESS,
)();
