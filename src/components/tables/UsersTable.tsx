import { Button, MenuItem, Paper, Select } from '@material-ui/core';
import { Cancel, DoneOutline, Remove, Edit, Create } from '@material-ui/icons';
import {
  DataGrid,
  GridCellModes,
  GridCellParams,
  GridColumnHeaderParams,
  GridColumns,
  GridEditRowsModel,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import React, { useCallback, useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useAuth } from '../../hooks';
import { Permission } from '../../models/User';
import { UserView } from '../../models/UserView';

export type UsersTableProps = {
  users: UserView[];
  onBlockClick: (id: number, isBlocked: boolean) => void;
  updateUser: (user: Partial<UserView>) => void;
};

const renderEmptyString = (params: GridRenderCellParams) => {
  return (
    params.value || (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Remove />
      </div>
    )
  );
};

const getPermission = (params: GridValueGetterParams) => {
  return Permission[params.value as number];
};

const renderPermission = (params: GridRenderCellParams) => {
  const permission = params.value as Permission;
  params.cellMode = GridCellModes.Edit;
  const { updateUser } = useUsers();

  return (
        <Select
          autoWidth
          value={permission}
          IconComponent={Create}
          disableUnderline
          onChange={(e) => updateUser({id: params.id as number, permission: e.target.value as Permission})}
          disabled={params.value == Permission.SuperAdmin}
          >
          <MenuItem value={Permission.Guest}>Guest</MenuItem>
          <MenuItem value={Permission.User}>User</MenuItem>
          <MenuItem value={Permission.Agent}>Agent</MenuItem>
          <MenuItem value={Permission.Admin}>Admin</MenuItem>
          <MenuItem value={Permission.SuperAdmin} disabled>Super admin</MenuItem>
        </Select>
  )
}

const renderBool = (params: GridRenderCellParams) => {
  const boolVal = params.value as boolean;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {boolVal ? <DoneOutline color="primary" /> : <Cancel color="error" />}
    </div>
  );
};

const renderBlockButton = (params: GridRenderCellParams) => {
  const isBlocked = params.value as boolean;

  return (
    <Button
      color={isBlocked ? 'primary' : 'secondary'}
      fullWidth
      variant="contained"
      disabled={params.row.permission == Permission.SuperAdmin}>
      {isBlocked ? 'Unblock' : 'Block'}
    </Button>
  );
};

const renderEditableHeader = (params: GridColumnHeaderParams) => {
  return (
    <>
      {params.colDef.headerName}<Edit fontSize="small" color="primary" />
    </>
  )
}

const columns: GridColumns = [
  {
    field: 'id',
    headerName: 'Id',
    width: 90,
    headerAlign: 'right',
    align: 'right',
  },
  {
    field: 'agencyName',
    headerName: 'Agency',
    width: 150,
    renderCell: renderEmptyString,
  },
  {
    field: 'permission',
    headerName: 'Permission',
    width: 160,
    renderCell: renderPermission,
    renderHeader: renderEditableHeader,
  },
  { field: 'telegramAccountId', headerName: 'Telegram Id', width: 180 },
  { field: 'telegramLogin', headerName: 'Telegram Login', width: 180 },
  { field: 'telegramFirstName', headerName: 'First Name', width: 150 },
  {
    field: 'telegramLastName',
    headerName: 'Last Name',
    width: 150,
    renderCell: renderEmptyString,
  },
  { field: 'telegramPhoneNumber', headerName: 'Phone', width: 150 },
  { field: 'lastCalledAt', headerName: 'Last Update', width: 150 },
  {
    field: 'isBlocked',
    headerName: 'Blocked',
    width: 150,
    renderCell: renderBlockButton,
    renderHeader: renderEditableHeader
  },
  {
    field: 'blockReason',
    headerName: 'Block Reason',
    width: 200,
    renderCell: renderEmptyString,
    renderHeader: renderEditableHeader
  },
  {
    field: 'isBlockedByBot',
    headerName: 'Blocked By Bot',
    width: 200,
    renderCell: renderBool,
  },
  {
    field: 'isIgnored',
    headerName: 'Ignored',
    width: 150,
    renderCell: renderBool,
  },
  {
    field: 'note',
    headerName: 'Note',
    width: 150,
    renderCell: renderEmptyString,
    editable: true,
    renderHeader: renderEditableHeader
  },
];

const UsersTable: React.FC<UsersTableProps> = (props) => {
  const { users, onBlockClick, updateUser } = props;
  const {account} = useAuth();
  const [editModel, setEditModel] = useState({});

  const onCellClick = useCallback(
    (params: GridCellParams) => {
      if (params.field != 'isBlocked') return;
      if (params.row.permission == Permission.SuperAdmin) return;
      onBlockClick(params.id as number, params.value as boolean);
    },
    [onBlockClick],
  );

  const onRowEdit = (model: GridEditRowsModel) => {
    setEditModel(model);
    for(let changeId in model)
    {
      const userChanges = model[changeId];
      for(let change in userChanges)
      {
        updateUser({id: Number(changeId), [change]: userChanges[change].value });
      }
    }
  }

  return (
    <Paper>
      <DataGrid
        columns={columns}
        rows={users}
        disableSelectionOnClick
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        checkboxSelection
        onCellClick={onCellClick}
        editRowsModel={editModel}
        onEditRowsModelChange={onRowEdit}
        isRowSelectable={(params) => account.user?.id !== (params.id as number)}
      />
    </Paper>
  );
};

export default UsersTable;
