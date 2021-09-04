import { Box, Typography, useTheme } from '@material-ui/core';
import React, { useEffect } from 'react';
import BotSettingsTable from '../components/tables/BotSettingsTable';
import Layout from '../components/Layout';
import { useBotStatus } from '../hooks';
import UpdateSnackbar from '../components/UpdateSnackbar';
import BotStatusTable from '../components/tables/BotStatusTable';

const BotSettingsPage: React.FC = () => {
  const theme = useTheme();
  const {
    botSettings,
    hasUpdates,
    addUpdate,
    loadSettings,
    saveSettings,
    resetSettings,
  } = useBotStatus();

  useEffect(() => {
    if (!botSettings) {
      loadSettings();
    }
  }, [botSettings, loadSettings]);

  return (
    <Layout>
      <Typography variant="h3">Bot Settings</Typography>
      <hr />
      <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
        <BotStatusTable
          botUser={botSettings?.botUser}
          isEnabled={botSettings?.isEnabled}
        />
      </Box>
      <Box style={{ width: '100%' }}>
        <BotSettingsTable
          updateSettings={addUpdate}
          botSettings={botSettings}
        />
      </Box>
      <UpdateSnackbar
        open={hasUpdates || false}
        onCancelClick={resetSettings}
        onSaveClick={saveSettings}
      />
    </Layout>
  );
};

export default BotSettingsPage;
