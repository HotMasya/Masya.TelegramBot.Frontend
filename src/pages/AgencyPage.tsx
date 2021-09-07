import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { useAgency } from '../hooks';
import Layout from '../components/Layout';
import AgencySettingsTable from '../components/tables/AgencySettingsTable';
import UpdateSnackbar from '../components/UpdateSnackbar';
import AgentsTable from '../components/tables/AgentsTable';

const AgencyPage: React.FC = () => {
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

export default AgencyPage;
