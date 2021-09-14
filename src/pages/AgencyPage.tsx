import React, { useEffect } from 'react';
import {
  Layout,
  PageHeader,
  AgencySettingsTable,
  AgentsTable,
  UpdateSnackbar,
} from '../components';
import { useAgency } from '../hooks';
import { Permission } from '../models';

export const AgencyPage: React.FC = () => {
  const {
    agency,
    hasUpdates,
    loadings,
    saveAgency,
    resetAgency,
    loadAgency,
    updateAgency,
    removeAgent,
  } = useAgency();

  useEffect(loadAgency, []);

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
      <UpdateSnackbar
        open={hasUpdates}
        onSaveClick={saveAgency}
        onCancelClick={resetAgency}
        loading={loadings.loadingSave}
      />
    </Layout>
  );
};
