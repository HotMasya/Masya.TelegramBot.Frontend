import React, { useEffect } from 'react';
import { Box, useTheme, Grid, Fab } from '@material-ui/core';
import {
  Layout,
  PageHeader,
  MinMaxTable,
  UpdateSnackbar,
  RoomsTable,
} from '../components';
import { useCounter, useMinMaxValues } from '../hooks';
import { Add } from '@material-ui/icons';

export const KeyboardsPage: React.FC = () => {
  const {
    loadValues,
    loadings,
    prices,
    floors,
    rooms,
    updatePrice,
    updateFloors,
    saveValues,
    addPrice,
    addFloors,
    resetUpdates,
    hasUpdates,
    removePrice,
    removeFloors,
    addRooms,
    updateRooms,
    removeRooms,
  } = useMinMaxValues();
  const theme = useTheme();
  const counterFloors = useCounter('minmaxvalues_floor');
  const counterPrices = useCounter('minmaxvalues_prices');
  const counterRooms = useCounter('minmaxvalues_rooms');
  useEffect(() => {
    loadValues();
  }, [loadValues]);

  const onPriceAddClick = () => {
    const newId = counterPrices.next();
    addPrice({
      id: -newId,
      minVal: newId * 1000,
      maxVal: newId * 1000,
    });
  };

  const onFloorAddClick = () => {
    const newId = counterFloors.next();
    addFloors({
      id: -newId,
      minVal: newId,
      maxVal: newId,
    });
  };

  const onRoomsAddClick = () => {
    const newId = counterRooms.next();
    addRooms({
      id: -newId,
      roomsCount: newId,
    });
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <PageHeader headerText="Prices">
            <Fab color="primary" size="small" onClick={onPriceAddClick}>
              <Add />
            </Fab>
          </PageHeader>
          <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
            <MinMaxTable
              values={prices ?? []}
              loading={loadings.loading}
              updateValue={updatePrice}
              removeValue={removePrice}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <PageHeader headerText="Floors">
            <Fab color="primary" size="small" onClick={onFloorAddClick}>
              <Add />
            </Fab>
          </PageHeader>
          <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
            <MinMaxTable
              values={floors ?? []}
              loading={loadings.loading}
              updateValue={updateFloors}
              removeValue={removeFloors}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <PageHeader
            headerText="Rooms"
            onReloadClick={loadValues}
            reloadDisabled={loadings.loading}>
            <Fab color="primary" size="small" onClick={onRoomsAddClick}>
              <Add />
            </Fab>
          </PageHeader>
          <Box style={{ width: '100%', padding: theme.spacing(3, 0) }}>
            <RoomsTable
              values={rooms ?? []}
              loading={loadings.loading}
              updateValue={updateRooms}
              removeValue={removeRooms}
            />
          </Box>
        </Grid>
      </Grid>
      <UpdateSnackbar
        open={hasUpdates || false}
        onCancelClick={resetUpdates}
        onSaveClick={saveValues}
        loading={loadings.loadingSave}
      />
    </Layout>
  );
};
