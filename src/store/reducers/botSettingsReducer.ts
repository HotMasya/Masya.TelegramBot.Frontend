import { BotSettings } from "src/models/BotSettings";
import { createReducer } from "typesafe-actions";
import { RootAction } from "..";
import * as actions from '../actions';

export type BotSettingsState = {
    botSettings?: BotSettings,
    botSettingsUpdates?: Partial<BotSettings>,
    hasUpdates: boolean,
    loadError?: Error,
    saveError?: Error,
}

const initialState: BotSettingsState = {
    hasUpdates: false,
}

export const botSettingsReducer = createReducer<BotSettingsState, RootAction>(initialState)
    .handleAction(actions.setBotSettings, (state, action) => {
        state.botSettings = action.payload;
        state.botSettingsUpdates = {...action.payload};
        return {...state, hasUpdates: false};
    })
    .handleAction(actions.loadBotSettingsError, (state, action) => ({
        ...state,
        loadError: action.payload
    }))
    .handleAction(actions.saveBotSettingsError, (state, action) => ({
        ...state,
        saveError: action.payload,
    }));