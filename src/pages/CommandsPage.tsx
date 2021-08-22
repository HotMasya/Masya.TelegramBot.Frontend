import { Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import CommandsTable from '../components/tables/CommandsTable';
import { useCommands } from '../hooks';
import UpdateSnackbar from '../components/UpdateSnackbar';

const CommandsPage: React.FC = () => {
  const {
    commands,
    hasCommandsUpdate,
    loadCommands,
    updateCommand,
    resetCommandsUpdates,
  } = useCommands();
  useEffect(() => {
    if (!commands?.length) {
      loadCommands();
    }
  }, [commands, commands?.length, loadCommands]);

  return (
    <Layout>
      <Typography variant="h3">Bot Commands</Typography>
      <hr />
      <CommandsTable commands={commands || []} updateCommand={updateCommand} />
      <UpdateSnackbar
        open={hasCommandsUpdate || false}
        onCancelClick={resetCommandsUpdates}
      />
    </Layout>
  );
};

export default CommandsPage;
