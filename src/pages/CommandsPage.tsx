import { Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import CommandsTable from '../components/tables/CommandsTable';
import { useCommands } from 'src/hooks';

const CommandsPage: React.FC = () => {
  const { commands, loadCommands, updateCommand } = useCommands();
  useEffect(() => {
    if (!commands?.length) {
      loadCommands();
    }
  }, [commands, loadCommands]);

  return (
    <Layout>
      <Typography variant="h3">Bot Commands</Typography>
      <hr />
      <CommandsTable commands={commands || []} updateCommand={updateCommand} />
    </Layout>
  );
};

export default CommandsPage;
