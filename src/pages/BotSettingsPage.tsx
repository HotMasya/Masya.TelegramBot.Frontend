import { Box, createStyles, styled, TextField, Theme, Typography, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import BotSettingsTable from '../components/tables/BotSettingsTable';
import Layout from '../components/Layout';
import { useBotStatus } from '../hooks';

const BotSettingsPage: React.FC = () => {
  const theme = useTheme();
  const {
    botSettings,
    addUpdate,
    loadSettings,
  } = useBotStatus();

  useEffect(() => {
    if(!botSettings)
    {
      loadSettings();
    }
  }, [botSettings])

  return (
    <Layout>
      <Typography variant="h3">Bot Settings</Typography>
      <hr />
      <Box style={{width: '100%', paddingTop: theme.spacing(3)}}>
        <BotSettingsTable updateSettings={addUpdate} botSettings={botSettings} />
      </Box>
    </Layout>
  );
};

export default BotSettingsPage;
