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
  loading?: boolean;
  loadingSave?: boolean;
};

const initialState: BotSettingsState = {
  hasUpdates: false,
  loading: false,
  loadingSave: false,
};

export const botSettingsReducer = createReducer<BotSettingsState, RootAction>(
  initialState,
)
  .handleAction(actions.loadBotSettings, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.saveBotSettings, (state) => ({
    ...state,
    loadingSave: true,
  }))
  .handleAction(actions.saveBotSettingsSuccess, (state) => ({
    ...state,
    loadingSave: false,
    hasUpdates: false,
    botSettings: { ...(state.botSettingsUpdates as BotSettings) },
  }))
  .handleAction(actions.setBotSettings, (state, action) => ({
    ...state,
    hasUpdates: false,
    loading: false,
    botSettings: action.payload,
    botSettingsUpdates: { ...action.payload },
  }))
  .handleAction(actions.updateBotSettings, (state, action) => {
    if (!state?.botSettingsUpdates) return state;

    state.botSettingsUpdates.token =
      action.payload.token ?? state.botSettingsUpdates.token;
    state.botSettingsUpdates.webhookHost =
      action.payload.webhookHost ?? state.botSettingsUpdates.webhookHost;
    state.botSettingsUpdates.isEnabled =
      action.payload.isEnabled ?? state.botSettingsUpdates.isEnabled;

    if (
      JSON.stringify(state.botSettings) ==
      JSON.stringify(state.botSettingsUpdates)
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
