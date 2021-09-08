import { Box, useTheme } from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  Layout,
  PageHeader,
  BotStatusTable,
  BotSettingsTable,
  UpdateSnackbar,
} from '../components';
import { useAuth, useBotStatus } from '../hooks';
import { Permission } from '../models';

export const BotSettingsPage: React.FC = () => {
  const theme = useTheme();
  const {
    botSettings,
    defaultBotSettings,
    hasUpdates,
    addUpdate,
    loadSettings,
    saveSettings,
    resetSettings,
    loadings,
  } = useBotStatus();
  const { account } = useAuth();

  useEffect(loadSettings, []);

  return (
    <Layout>
      <PageHeader
        headerText="Bot Settings"
        onReloadClick={loadSettings}
        reloadDisabled={loadings.loading}
      />
      <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
        <BotStatusTable
          botSettings={defaultBotSettings || {}}
          loading={loadings.loading}
        />
      </Box>
      {account.user?.permission == Permission.SuperAdmin && (
        <Box style={{ width: '100%' }}>
          <BotSettingsTable
            updateSettings={addUpdate}
            botSettings={botSettings}
            loading={loadings.loading}
          />
        </Box>
      )}

      <UpdateSnackbar
        open={hasUpdates || false}
        onCancelClick={resetSettings}
        onSaveClick={saveSettings}
        loading={loadings.loadingSave}
      />
    </Layout>
  );
};
