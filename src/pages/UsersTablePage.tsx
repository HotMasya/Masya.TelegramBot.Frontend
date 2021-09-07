import { Box, useTheme } from '@material-ui/core';
import React, { useEffect } from 'react';
import UsersTable from '../components/tables/UsersTable';
import Layout from '../components/Layout';
import { useUsers } from '../hooks/useUsers';
import { useState } from 'react';
import { useCallback } from 'react';
import BlockUserDialog from '../components/BlockUserDialog';
import UpdateSnackbar from '../components/UpdateSnackbar';
import PageHeader from '../components/PageHeader';

const UsersTablePage: React.FC = () => {
  const {
    users,
    loadUsers,
    saveUsers,
    updateUser,
    hasUpdates,
    resetUsers,
    removeUser,
    loadings,
  } = useUsers();
  const theme = useTheme();
  const [userDialogId, setUserDialogId] = useState<number | undefined>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string | undefined>();

  useEffect(loadUsers, []);

  const onBlockClick = useCallback(
    (id: number, isBlocked: boolean) => {
      if (isBlocked) {
        updateUser({ id, isBlocked: false, blockReason: '' });
        return;
      }

      const user = users?.find((u) => u.id === id);
      if (user) {
        setFirstName(user.telegramFirstName);
        setLastName(user.telegramLastName);
        setUserDialogId(id);
      }
    },
    [users, updateUser],
  );

  const onDialogCancel = useCallback(() => {
    setUserDialogId(undefined);
  }, [setUserDialogId]);

  const onDialogBlockClick = (reason?: string) => {
    if (!reason) return false;

    updateUser({ id: userDialogId, blockReason: reason, isBlocked: true });
    setFirstName('');
    setLastName('');
    setUserDialogId(undefined);
    return true;
  };

  return (
    <Layout>
      <PageHeader
        headerText="Users"
        onReloadClick={loadUsers}
        reloadDisabled={loadings.loading}
      />
      <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
        <UsersTable
          users={users ?? []}
          onBlockClick={onBlockClick}
          updateUser={updateUser}
          removeUser={removeUser}
          loading={loadings.loading}
        />
      </Box>
      <BlockUserDialog
        onBlockClick={onDialogBlockClick}
        onDialogCancel={onDialogCancel}
        userFirstName={firstName}
        userLastName={lastName}
        open={Boolean(userDialogId)}
      />
      <UpdateSnackbar
        open={hasUpdates || false}
        onCancelClick={resetUsers}
        onSaveClick={saveUsers}
        loading={loadings.loadingSave}
      />
    </Layout>
  );
};

export default UsersTablePage;
