import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useAgency } from '../hooks';
import Layout from '../components/Layout';
import AgencySettingsTable from '../components/tables/AgencySettingsTable';
import UpdateSnackbar from '../components/UpdateSnackbar';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';

const AgencyPage: React.FC = () => {

    const {
        agency,
        hasUpdates,
        loadings,
        saveAgency,
        resetAgency,
        loadAgency,
        updateAgency,
        errors,
    } = useAgency();

    const [dialogOpen, setDialogOpen] = useState<boolean | undefined>();

    useEffect(loadAgency, [])
    
    return (
        <Layout>
            <PageHeader headerText="Agency" reloadDisabled={loadings.loading} onReloadClick={loadAgency} />
            <AgencySettingsTable agency={agency || {}} loading={loadings.loading} updateAgency={updateAgency} />
            <UpdateSnackbar open={hasUpdates} onSaveClick={saveAgency} onCancelClick={resetAgency} loading={loadings.loadingSave} />
        </Layout>
    )
}

export default AgencyPage;
