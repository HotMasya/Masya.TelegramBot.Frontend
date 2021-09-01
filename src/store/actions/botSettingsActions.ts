import { BotSettings } from "../../models/BotSettings";
import { createStandardAction } from "typesafe-actions";
import { BotSettingsActionTypes } from "../action-types";

export const loadBotSettings = createStandardAction(
    BotSettingsActionTypes.LOAD_SETTINGS
)();
export const saveBotSettings = createStandardAction(
    BotSettingsActionTypes.SAVE_SETTINGS
)();
export const saveBotSettingsSuccess = createStandardAction(
    BotSettingsActionTypes.SAVE_SUCCESS
)();
export const setBotSettings = createStandardAction(
    BotSettingsActionTypes.SET_SETTINGS
)<BotSettings>();
export const updateBotSettings = createStandardAction(
    BotSettingsActionTypes.UPDATE_SETTINGS
)<Partial<BotSettings>>();
export const saveBotSettingsError = createStandardAction(
    BotSettingsActionTypes.SAVE_ERROR
)<Error>();
export const loadBotSettingsError = createStandardAction(
    BotSettingsActionTypes.LOAD_ERROR
)<Error>();
export const resetBotSettingsUpdates = createStandardAction(
    BotSettingsActionTypes.RESET_UPDATES
)();
