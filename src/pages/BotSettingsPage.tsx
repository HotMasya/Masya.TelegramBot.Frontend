import { Box, useTheme } from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  Layout,
  PageHeader,
  BotStatusTable,
  BotSettingsTable,
  UpdateSnackbar,
  LogsTable,
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
    startImporting,
    loadings,
    loadLogs,
    logs,
  } = useBotStatus();
  const { account } = useAuth();

  useEffect(loadSettings, []);

  return (
    <Layout>
      <PageHeader
        headerText="Bot Status"
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
        <>
          <PageHeader headerText="Bot Settings" />
          <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
            <BotSettingsTable
              updateSettings={addUpdate}
              botSettings={botSettings}
              loading={loadings.loading}
              onImportingClick={startImporting}
            />
          </Box>
          <PageHeader
            headerText="Bot Logs"
            onReloadClick={loadLogs}
            reloadDisabled={loadings.loading}
          />
          <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
            <LogsTable
              logs={logs}
              onLoadClick={loadLogs}
              loading={loadings.loadingLogs}
              emptyTableMessage="There are no logs loaded for the last hour."
            />
          </Box>
        </>
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
