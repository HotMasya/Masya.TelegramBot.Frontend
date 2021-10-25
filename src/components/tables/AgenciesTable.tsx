import { Paper, Box, Button, useTheme } from '@material-ui/core';
import {
  GridColumns,
  GridRenderCellParams,
  GridColumnHeaderParams,
  DataGrid,
  GridEditRowsModel,
  GridInputSelectionModel,
} from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootAction } from '../../store';
import { RootState } from '../../store/reducers';
import { Remove, Edit } from '@material-ui/icons';
import * as actions from '../../store/actions';
import { Dispatch } from 'redux';
import { UpdateSnackbar } from '..';
import { useCounter } from '../../hooks';

const RenderEmptyString = (params: GridRenderCellParams) => {
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

const RenderEditableHeader = (params: GridColumnHeaderParams) => {
  return (
    <>
      {params.colDef.headerName}
      <Edit fontSize="small" color="primary" />
    </>
  );
};

const columns: GridColumns = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    renderHeader: RenderEditableHeader,
    renderCell: RenderEmptyString,
    editable: true,
    width: 150,
  },
  {
    field: 'description',
    headerName: 'Description',
    renderHeader: RenderEditableHeader,
    renderCell: RenderEmptyString,
    editable: true,
    width: 250,
  },
  {
    field: 'dateOfUnblock',
    headerName: 'Date Of Unblock',
    width: 200,
    renderCell: RenderEmptyString,
  },
  {
    field: 'registrationKey',
    headerName: 'Registration Key',
    editable: true,
    width: 200,
    renderHeader: RenderEditableHeader,
    renderCell: RenderEmptyString,
  },
  {
    field: 'isRegWithoutAdmin',
    headerName: 'Registration w/no Admin',
    type: 'boolean',
    width: 250,
    renderHeader: RenderEditableHeader,
    align: 'center',
    headerAlign: 'center',
    editable: true,
  },
  {
    field: 'importUrl',
    headerName: 'Import Url',
    editable: true,
    width: 250,
    renderCell: RenderEmptyString,
    renderHeader: RenderEditableHeader,
  },
];

export const AgenciesTable: React.FC = () => {
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const agencies = useSelector((state: RootState) => state.agencies);
  const [editModel, setEditModel] = useState<GridEditRowsModel | undefined>();
  const [selectionModel, setSelectionModel] = useState<
    GridInputSelectionModel | undefined
  >();
  const theme = useTheme();
  const { next } = useCounter('agencies');

  const onSelectionModelChange = useCallback(
    (model: GridInputSelectionModel) => {
      setSelectionModel(model);
    },
    [setSelectionModel],
  );

  const onRowEdit = useCallback(
    (model: GridEditRowsModel) => {
      setEditModel(model);
      for (const changeId in model) {
        const agencyChanges = model[changeId];
        for (const change in agencyChanges) {
          dispatch(
            actions.updateAgencies({
              id: Number(changeId),
              [change]: agencyChanges[change].value,
            }),
          );
        }
      }
    },
    [setEditModel],
  );

  const onRowAdd = useCallback(() => {
    dispatch(
      actions.addAgency({
        id: -next(),
      }),
    );
  }, [dispatch, next]);

  const onRowRemove = () => {
    if (!selectionModel) {
      return;
    }

    const model = selectionModel as Array<number>;

    for (const id of model) {
      dispatch(actions.removeAgency(id));
    }
    setSelectionModel([]);
  };

  const saveAgenciesUpdates = useCallback(
    () => dispatch(actions.saveAgencies()),
    [dispatch],
  );
  const cancelAgenciesUpdates = useCallback(
    () => dispatch(actions.removeAgenciesUpdates()),
    [dispatch],
  );

  useEffect(() => {
    dispatch(actions.loadAgencies());
  }, [dispatch]);

  return (
    <Paper>
      <DataGrid
        rows={agencies.agenciesToUpdate || []}
        loading={agencies.loading}
        columns={columns}
        rowsPerPageOptions={[10]}
        pageSize={10}
        autoHeight
        checkboxSelection
        disableSelectionOnClick
        selectionModel={selectionModel}
        onSelectionModelChange={onSelectionModelChange}
        editRowsModel={editModel}
        onEditRowsModelChange={onRowEdit}
      />
      <Box
        style={{
          padding: theme.spacing(2),
        }}>
        <Button
          style={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            display:
              (selectionModel as Array<number>) &&
              (selectionModel as Array<number>).length > 0
                ? 'inline-block'
                : 'none',
            marginRight: theme.spacing(2),
          }}
          variant="contained"
          onClick={onRowRemove}>
          Delete selected value(s)
        </Button>
        <Button variant="contained" color="primary" onClick={onRowAdd}>
          Add new agency
        </Button>
      </Box>
      <UpdateSnackbar
        open={agencies.hasUpdates}
        onSaveClick={saveAgenciesUpdates}
        onCancelClick={cancelAgenciesUpdates}
        loading={agencies.loadingSave}
      />
    </Paper>
  );
};
