import { Box, useTheme } from '@material-ui/core';
import React from 'react';
import { Layout, PageHeader } from '../components';
import { AgenciesTable } from '../components/tables/AgenciesTable';

export const AgenciesPage: React.FC = () => {
  const theme = useTheme();
  return (
    <Layout>
      <PageHeader headerText="Agencies" />
      <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
        <AgenciesTable />
      </Box>
    </Layout>
  );
};
