import {
  Paper,
  Box,
  Button,
  useTheme,
  Select,
  MenuItem,
} from '@material-ui/core';
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
import { Remove, Edit, Create } from '@material-ui/icons';
import * as actions from '../../store/actions';
import { Dispatch } from 'redux';
import { UpdateSnackbar } from '..';
import { useCounter } from '../../hooks';
import { DirectoryItem } from '../../models';

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

const RenderCategory = (params: GridRenderCellParams) => {
  const { categories } = useSelector((state: RootState) => state.objects);
  const categoryId = params.value as number;
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const updateObject = useCallback(
    (id: number, categoryId: number) =>
      dispatch(actions.updateObject({ id, categoryId })),
    [dispatch],
  );

  return (
    <Select
      autoWidth
      value={categoryId}
      IconComponent={Create}
      disableUnderline
      onChange={(e) =>
        updateObject(params.id as number, e.target.value as number)
      }>
      {categories && categories.length > 0 ? (
        categories?.map((a) => (
          <MenuItem value={a.id} key={a.id}>
            {a.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem value="">Select category</MenuItem>
      )}
    </Select>
  );
};

function RenderStreets(params: GridRenderCellParams) {
  const itemId = params.value as number;
  const streets = useSelector((state: RootState) => state.objects.streets);
  const street = streets?.find((s) => s.id === itemId);

  return street ? (
    <span>{street.value}</span>
  ) : (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Remove />
    </div>
  );
}

function RenderWallMaterials(params: GridRenderCellParams) {
  const itemId = params.value as number;
  const wallMaterials = useSelector(
    (state: RootState) => state.objects.wallMaterials,
  );
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const updateObject = useCallback(
    (id: number, wallMaterialId: number) =>
      dispatch(actions.updateObject({ id, wallMaterialId })),
    [dispatch],
  );

  return (
    <Select
      autoWidth
      value={itemId}
      IconComponent={Create}
      disableUnderline
      onChange={(e) =>
        updateObject(params.id as number, e.target.value as number)
      }>
      {wallMaterials && wallMaterials.length > 0 ? (
        wallMaterials?.map((a) => (
          <MenuItem value={a.id} key={a.id}>
            {a.value}
          </MenuItem>
        ))
      ) : (
        <MenuItem value="">Select wall material</MenuItem>
      )}
    </Select>
  );
}

function RenderDistricts(params: GridRenderCellParams) {
  const itemId = params.value as number;
  const districts = useSelector((state: RootState) => state.objects.districts);
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const updateObject = useCallback(
    (id: number, districtId: number) =>
      dispatch(actions.updateObject({ id, districtId })),
    [dispatch],
  );

  return (
    <Select
      autoWidth
      value={itemId}
      IconComponent={Create}
      disableUnderline
      onChange={(e) =>
        updateObject(params.id as number, e.target.value as number)
      }>
      {districts && districts.length > 0 ? (
        districts?.map((a) => (
          <MenuItem value={a.id} key={a.id}>
            {a.value}
          </MenuItem>
        ))
      ) : (
        <MenuItem value="">Select district</MenuItem>
      )}
    </Select>
  );
}

function RenderStates(params: GridRenderCellParams) {
  const itemId = params.value as number;
  const districts = useSelector((state: RootState) => state.objects.states);
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const updateObject = useCallback(
    (id: number, stateId: number) =>
      dispatch(actions.updateObject({ id, stateId })),
    [dispatch],
  );

  return (
    <Select
      autoWidth
      value={itemId}
      IconComponent={Create}
      disableUnderline
      onChange={(e) =>
        updateObject(params.id as number, e.target.value as number)
      }>
      {districts && districts.length > 0 ? (
        districts?.map((a) => (
          <MenuItem value={a.id} key={a.id}>
            {a.value}
          </MenuItem>
        ))
      ) : (
        <MenuItem value={undefined}>Select state</MenuItem>
      )}
    </Select>
  );
}

const columns: GridColumns = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'internalId',
    headerName: 'Internal Id',
    renderCell: RenderEmptyString,
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
    field: 'streetId',
    headerName: 'Street',
    width: 200,
    renderHeader: RenderEditableHeader,
    renderCell: RenderStreets,
  },
  {
    field: 'districtId',
    headerName: 'District',
    width: 200,
    renderHeader: RenderEditableHeader,
    renderCell: RenderDistricts,
  },
  {
    field: 'wallMaterialId',
    headerName: 'Wall Material',
    width: 200,
    renderHeader: RenderEditableHeader,
    renderCell: RenderWallMaterials,
  },
  {
    field: 'stateId',
    headerName: 'State',
    width: 200,
    renderHeader: RenderEditableHeader,
    renderCell: RenderStates,
  },
  {
    field: 'agentId',
    headerName: 'Agent',
    width: 200,
    renderCell: RenderEmptyString,
  },
  {
    field: 'categoryId',
    headerName: 'Category',
    width: 200,
    renderHeader: RenderEditableHeader,
    renderCell: RenderCategory,
  },
  {
    field: 'totalArea',
    headerName: 'Total Area',
    type: 'number',
    width: 200,
    renderHeader: RenderEditableHeader,
    align: 'center',
    headerAlign: 'center',
    editable: true,
  },
  {
    field: 'livingSpace',
    headerName: 'Living Area',
    type: 'number',
    width: 200,
    renderHeader: RenderEditableHeader,
    align: 'center',
    headerAlign: 'center',
    editable: true,
  },
  {
    field: 'kitchenSpace',
    headerName: 'Kitchen Area',
    type: 'number',
    width: 200,
    renderHeader: RenderEditableHeader,
    align: 'center',
    headerAlign: 'center',
    editable: true,
  },
  {
    field: 'lotArea',
    headerName: 'Lot Area',
    type: 'number',
    width: 200,
    renderHeader: RenderEditableHeader,
    align: 'center',
    headerAlign: 'center',
    editable: true,
  },
  {
    field: 'floor',
    headerName: 'Floor',
    width: 200,
    renderHeader: RenderEditableHeader,
    editable: true,
  },
  {
    field: 'totalFloors',
    headerName: 'Total Floors',
    width: 200,
    renderHeader: RenderEditableHeader,
    editable: true,
  },
  {
    field: 'rooms',
    headerName: 'Rooms',
    width: 200,
    renderHeader: RenderEditableHeader,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 200,
    renderHeader: RenderEditableHeader,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Contacts',
    width: 250,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 250,
  },
  {
    field: 'editedAt',
    headerName: 'Edited At',
    width: 250,
  },
];

export const ObjectsTable: React.FC = () => {
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const objects = useSelector((state: RootState) => state.objects);
  const [editModel, setEditModel] = useState<GridEditRowsModel | undefined>();
  const [selectionModel, setSelectionModel] = useState<
    GridInputSelectionModel | undefined
  >();
  const theme = useTheme();
  const { next } = useCounter('objects');

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
        const objectChanges = model[changeId];
        for (const change in objectChanges) {
          dispatch(
            actions.updateObject({
              id: Number(changeId),
              [change]: objectChanges[change].value,
            }),
          );
        }
      }
    },
    [setEditModel],
  );

  const onRowAdd = useCallback(() => {
    dispatch(
      actions.addObject({
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
      dispatch(actions.removeObject(id));
    }
    setSelectionModel([]);
  };

  const saveObjectsUpdates = useCallback(
    () => dispatch(actions.saveObjects()),
    [dispatch],
  );
  const cancelObjectsUpdates = useCallback(
    () => dispatch(actions.removeObjectsUpdates()),
    [dispatch],
  );

  useEffect(() => {
    dispatch(actions.loadObjects());
  }, [dispatch]);

  return (
    <Paper>
      <DataGrid
        rows={objects.realtyObjectsToUpdate || []}
        loading={objects.loading}
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
        columnBuffer={20}
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
          Add new object
        </Button>
      </Box>
      <UpdateSnackbar
        open={objects.hasUpdates}
        onSaveClick={saveObjectsUpdates}
        onCancelClick={cancelObjectsUpdates}
        loading={objects.loadingSave}
      />
    </Paper>
  );
};
