import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import CommandsTable from '../components/tables/CommandsTable';
import { useCommands } from '../hooks';
import UpdateSnackbar from '../components/UpdateSnackbar';
import PageHeader from '../components/PageHeader';

const CommandsPage: React.FC = () => {
  const {
    commands,
    hasCommandsUpdate,
    loadCommands,
    updateCommand,
    resetCommandsUpdates,
    saveCommands,
    addCommand,
    removeCommand,
    errors,
    resetErrors,
    loadings,
  } = useCommands();

  useEffect(loadCommands, []);

  const [dialogOpen, setDialogOpen] = useState<boolean | undefined>();

  return (
    <Layout>
      <PageHeader
        headerText="Commands"
        onReloadClick={loadCommands}
        reloadDisabled={loadings.loading}
      />
      <CommandsTable
        removeCommand={removeCommand}
        addCommand={addCommand}
        commands={commands || []}
        updateCommand={updateCommand}
        loading={loadings.loading}
      />
      <UpdateSnackbar
        open={hasCommandsUpdate || false}
        onCancelClick={resetCommandsUpdates}
        onSaveClick={saveCommands}
        loading={loadings.loadingSave}
      />
      <Dialog
        open={dialogOpen ?? errors.saveError?.message != undefined}
        TransitionProps={{
          onExited: () => {
            setDialogOpen(undefined);
            resetErrors();
          },
        }}
        TransitionComponent={Slide}>
        <DialogTitle>Validation error</DialogTitle>
        <DialogContent>
          <DialogContentText>{errors.saveError?.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(false)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default CommandsPage;
