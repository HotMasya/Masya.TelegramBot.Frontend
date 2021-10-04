import { Box, useTheme } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Layout,
  PageHeader,
  UsersTable,
  BlockUserDialog,
  UpdateSnackbar,
} from '../components';
import { useUsers } from '../hooks';

export const UsersTablePage: React.FC = () => {
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
        updateUser({ id, isBlocked: false });
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
