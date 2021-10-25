import { Box, useTheme } from '@material-ui/core';
import React from 'react';
import { Layout, ObjectsTable, PageHeader } from '../components';

export const ObjectsPage: React.FC = () => {
  const theme = useTheme();
  return (
    <Layout>
      <PageHeader headerText="Objects" />
      <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
        <ObjectsTable />
      </Box>
    </Layout>
  );
};
