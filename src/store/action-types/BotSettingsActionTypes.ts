export enum BotSettingsActionTypes {
  LOAD_SETTINGS = '@bot_settings/LOAD',
  LOAD_ERROR = '@bot_settings/LOAD_ERROR',

  LOAD_LOGS = '@bot_settings/LOAD_LOGS',
  LOAD_LOGS_SUCCESS = '@bot_settings/LOAD_LOGS_SUCCESS',
  LOAD_LOGS_ERROR = '@bot_settings/LOAD_LOGS_ERROR',

  START_IMPORTING = '@bot_settings/START_IMPORTING',
  START_IMPORTING_SUCCESS = '@bot_settings/START_IMPORTING_SUCCESS',

  SAVE_SETTINGS = '@bot_settings/SAVE',
  SAVE_SUCCESS = '@bot_settings/SAVE_SUCCESS',
  SAVE_ERROR = '@bot_settings/SAVE_ERROR',
  SET_SETTINGS = '@bot_settings/SET',
  UPDATE_SETTINGS = '@bot_settings/UPDATE',

  RESET_UPDATES = '@bot_settings/RESET_UPDATES',
}
