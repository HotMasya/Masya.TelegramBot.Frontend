import { Box, Button, Paper, useTheme } from '@material-ui/core';
import {
  DataGrid,
  GridColumns,
  GridEditRowsModel,
  GridInputSelectionModel,
} from '@mui/x-data-grid';
import React, { useState } from 'react';
import { MinMaxValue } from '../../models';

const columns: GridColumns = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'minVal',
    headerName: 'Minimum Value',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    editable: true,
    type: 'number',
  },
  {
    field: 'maxVal',
    headerName: 'Maximum Value',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    editable: true,
    type: 'number',
  },
];

export interface MinMaxTableProps {
  values: Partial<MinMaxValue>[];
  loading?: boolean;
  updateValue: (model: Partial<MinMaxValue>) => void;
  removeValue: (id: number) => void;
}

export const MinMaxTable: React.FC<MinMaxTableProps> = ({
  values,
  loading,
  updateValue,
  removeValue,
}) => {
  const [selectionModel, setSelectionModel] = useState<
    GridInputSelectionModel | undefined
  >();
  const [editModel, setEditModel] = useState<GridEditRowsModel | undefined>();
  const theme = useTheme();

  const onRowEdit = (model: GridEditRowsModel) => {
    setEditModel(model);
    for (const changeId in model) {
      const valueChanges = model[changeId];
      for (const change in valueChanges) {
        updateValue({
          id: Number(changeId),
          [change]: valueChanges[change].value,
        });
      }
    }
  };

  const onSelectionModelChange = (model: GridInputSelectionModel) => {
    setSelectionModel(model);
  };

  const onRemoveClick = () => {
    if (!selectionModel) {
      return;
    }

    const model = selectionModel as Array<number>;

    for (const id of model) {
      removeValue(id);
    }
    setSelectionModel([]);
  };

  return (
    <Paper>
      <DataGrid
        rows={values}
        loading={loading}
        columns={columns}
        rowsPerPageOptions={[10]}
        pageSize={10}
        autoHeight
        checkboxSelection
        editRowsModel={editModel}
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectionModel}
        onEditRowsModelChange={onRowEdit}
        disableSelectionOnClick
      />
      <Box
        style={{
          display:
            (selectionModel as Array<number>) &&
            (selectionModel as Array<number>).length > 0
              ? 'block'
              : 'none',
          padding: theme.spacing(2),
        }}>
        <Button
          style={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          }}
          variant="contained"
          onClick={onRemoveClick}>
          Delete selected values(s)
        </Button>
      </Box>
    </Paper>
  );
};
