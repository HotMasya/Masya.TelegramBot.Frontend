import { Dispatch, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, RootAction } from '../store';
import { BotSettings } from '../models/BotSettings';
import { RootState } from '../store/reducers';

export const useBotStatus = () => {
  const botStatusState = useSelector((state: RootState) => state.botStatus);
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const botSettings = botStatusState.botSettingsUpdates;
  const defaultBotSettings = botStatusState.botSettings;
  const errors = {
    load: botStatusState.loadError,
    save: botStatusState.saveError,
  };

  const addUpdate = useCallback(
    (settings: Omit<Partial<BotSettings>, 'id'>) =>
      dispatch(actions.updateBotSettings(settings)),
    [dispatch],
  );

  const saveSettings = useCallback(() => {
    if (botStatusState.loadingSave) return;
    dispatch(actions.saveBotSettings());
  }, [dispatch, botStatusState.loadingSave]);
  const loadSettings = useCallback(
    () => dispatch(actions.loadBotSettings()),
    [dispatch],
  );
  const resetSettings = useCallback(
    () => dispatch(actions.resetBotSettingsUpdates()),
    [dispatch],
  );

  return {
    hasUpdates: botStatusState.hasUpdates,
    botSettings,
    defaultBotSettings,
    errors,
    addUpdate,
    saveSettings,
    loadSettings,
    resetSettings,
    loadings: {
      loading: botStatusState.loading,
      loadingSave: botStatusState.loadingSave,
    },
  };
};
