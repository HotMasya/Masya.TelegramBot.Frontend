import { BotSettings } from 'src/models/BotSettings';
import { createReducer } from 'typesafe-actions';
import { RootAction } from '..';
import * as actions from '../actions';

export type BotSettingsState = {
  botSettings?: BotSettings;
  botSettingsUpdates?: Partial<BotSettings>;
  hasUpdates: boolean;
  loadError?: Error;
  saveError?: Error;
};

const initialState: BotSettingsState = {
  hasUpdates: false,
};

export const botSettingsReducer = createReducer<BotSettingsState, RootAction>(
  initialState,
)
  .handleAction(actions.setBotSettings, (state, action) => {
    state.botSettings = action.payload;
    state.botSettingsUpdates = { ...action.payload };
    return { ...state, hasUpdates: false };
  })
  .handleAction(actions.updateBotSettings, (state, action) => {
    if (!state?.botSettingsUpdates) return state;

    state.botSettingsUpdates.token =
      action.payload.token ?? state.botSettingsUpdates.token;
    state.botSettingsUpdates.webhookHost =
      action.payload.webhookHost ?? state.botSettingsUpdates.webhookHost;
    state.botSettingsUpdates.isEnabled =
      action.payload.isEnabled ?? state.botSettingsUpdates.isEnabled;

    if (
      state.botSettings &&
      state.botSettings.token === state.botSettingsUpdates.token &&
      state.botSettings.webhookHost === state.botSettingsUpdates.webhookHost &&
      state.botSettings.isEnabled === state.botSettingsUpdates.isEnabled
    ) {
      return { ...state, hasUpdates: false };
    }

    return { ...state, hasUpdates: true };
  })
  .handleAction(actions.resetBotSettingsUpdates, (state) => ({
    ...state,
    hasUpdates: false,
    botSettingsUpdates: { ...state.botSettings },
  }))
  .handleAction(actions.loadBotSettingsError, (state, action) => ({
    ...state,
    loadError: action.payload,
  }))
  .handleAction(actions.saveBotSettingsError, (state, action) => ({
    ...state,
    saveError: action.payload,
  }));
