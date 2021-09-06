import { Box, useTheme } from '@material-ui/core';
import React, { useEffect } from 'react';
import BotSettingsTable from '../components/tables/BotSettingsTable';
import Layout from '../components/Layout';
import { useAuth, useBotStatus } from '../hooks';
import UpdateSnackbar from '../components/UpdateSnackbar';
import BotStatusTable from '../components/tables/BotStatusTable';
import PageHeader from '../components/PageHeader';
import { Permission } from '../models/User';

const BotSettingsPage: React.FC = () => {
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

  useEffect(() => {
    if (!botSettings) {
      loadSettings();
    }
  }, [botSettings, loadSettings]);

  return (
    <Layout>
      <PageHeader headerText="Bot Settings" onReloadClick={() => loadSettings()} reloadDisabled={loadings.loading} />
      <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
        <BotStatusTable
          botSettings={defaultBotSettings || {}}
          loading={loadings.loading}
        />
      </Box>
      { 
        account.user?.permission == Permission.SuperAdmin &&
        <Box style={{ width: '100%' }}>
          <BotSettingsTable
            updateSettings={addUpdate}
            botSettings={botSettings}
            loading={loadings.loading}
          />
        </Box>
      }

      <UpdateSnackbar
        open={hasUpdates || false}
        onCancelClick={resetSettings}
        onSaveClick={saveSettings}
        loading={loadings.loadingSave}
      />
    </Layout>
  );
};

export default BotSettingsPage;
