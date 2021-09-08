import React, { useEffect } from 'react';
import {
  Layout,
  PageHeader,
  AgencySettingsTable,
  AgentsTable,
  UpdateSnackbar,
} from '../components';
import { useAgency } from '../hooks';

export const AgencyPage: React.FC = () => {
  const {
    agency,
    hasUpdates,
    loadings,
    saveAgency,
    resetAgency,
    loadAgency,
    updateAgency,
  } = useAgency();

  useEffect(loadAgency, []);

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
      <PageHeader headerText="Agents" />
      <AgentsTable agents={agency?.agents ?? []} loading={loadings.loading} />
      <UpdateSnackbar
        open={hasUpdates}
        onSaveClick={saveAgency}
        onCancelClick={resetAgency}
        loading={loadings.loadingSave}
      />
    </Layout>
  );
};
