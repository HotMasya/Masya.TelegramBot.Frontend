import { Box, useTheme } from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  Layout,
  PageHeader,
  AgencySettingsTable,
  AgentsTable,
  UpdateSnackbar,
  LogsTable,
} from '../components';
import { useAgency } from '../hooks';
import { Permission } from '../models';

export const AgencyPage: React.FC = () => {
  const {
    agency,
    logs,
    loadImportLogs,
    hasUpdates,
    loadings,
    saveAgency,
    resetAgency,
    loadAgency,
    updateAgency,
    removeAgent,
  } = useAgency();

  useEffect(loadAgency, []);
  const theme = useTheme();
  const users = agency?.agents?.filter(
    (a) => a.permission < Permission.Admin && !a.willBeDeleted,
  );
  const admins = agency?.agents?.filter(
    (a) => a.permission >= Permission.Admin,
  );

  return (
    <Layout>
      <PageHeader
        headerText="Agency"
        reloadDisabled={loadings.loading}
        onReloadClick={loadAgency}
      />
      <AgencySettingsTable
        agency={agency || {}}
        loading={loadings.loading}
        updateAgency={updateAgency}
      />
      <PageHeader headerText="Admins" />
      <AgentsTable
        agents={admins ?? []}
        loading={loadings.loading}
        permission={Permission.Admin}
      />
      <PageHeader headerText="Agents" />
      <AgentsTable
        agents={users ?? []}
        loading={loadings.loading}
        permission={Permission.Agent}
        onRemoveClick={removeAgent}
      />
      <PageHeader headerText="Import logs" onReloadClick={loadImportLogs} />
      <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
        <LogsTable
          logs={logs}
          onLoadClick={loadImportLogs}
          loading={loadings.loadingLogs}
          emptyTableMessage="There are no logs loaded for the last day."
        />
      </Box>
      <UpdateSnackbar
        open={hasUpdates}
        onSaveClick={saveAgency}
        onCancelClick={resetAgency}
        loading={loadings.loadingSave}
      />
    </Layout>
  );
};
