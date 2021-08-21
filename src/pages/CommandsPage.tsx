import { Typography } from '@material-ui/core';
import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import { actions, RootAction } from '../store';
import CommandsTable from '../components/tables/CommandsTable';

const CommandsPage: React.FC = () => {
  const commandsState = useSelector((state: RootState) => state.commands);
  const dispatch = useDispatch<Dispatch<RootAction>>();
  useEffect(() => {
    if (!commandsState.commands) {
      dispatch(actions.loadCommands());
    }
  }, [commandsState.commands, dispatch]);

  return (
    <Layout>
      <Typography variant="h3">Bot Commands</Typography>
      <hr />
      <CommandsTable commands={commandsState.commands || []} />
    </Layout>
  );
};

export default CommandsPage;
