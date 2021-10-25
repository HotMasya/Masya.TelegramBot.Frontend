import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../store';
import { RootState } from '../store/reducers';
import * as actions from '../store/actions';
import { useCallback } from 'react';
import { MinMaxValue, Room } from '../models';

export const useMinMaxValues = () => {
  const minmaxState = useSelector((state: RootState) => state.minMaxValues);
  const dispatch = useDispatch<Dispatch<RootAction>>();

  const loadValues = useCallback(
    () => dispatch(actions.loadMinMax()),
    [dispatch],
  );
  const saveValues = useCallback(
    () => dispatch(actions.saveValues()),
    [dispatch],
  );
  const updatePrice = useCallback(
    (price: Partial<MinMaxValue>) => dispatch(actions.updatePrice(price)),
    [dispatch],
  );
  const updateFloors = useCallback(
    (floors: Partial<MinMaxValue>) => dispatch(actions.updateFloors(floors)),
    [dispatch],
  );
  const updateRooms = useCallback(
    (rooms: Partial<Room>) => dispatch(actions.updateRooms(rooms)),
    [dispatch],
  );
  const addPrice = useCallback(
    (price: Partial<MinMaxValue>) => dispatch(actions.addPrice(price)),
    [dispatch],
  );
  const addFloors = useCallback(
    (floors: Partial<MinMaxValue>) => dispatch(actions.addFloors(floors)),
    [dispatch],
  );
  const addRooms = useCallback(
    (rooms: Partial<Room>) => dispatch(actions.addRooms(rooms)),
    [dispatch],
  );
  const removePrice = useCallback(
    (id: number) => dispatch(actions.removePrice(id)),
    [dispatch],
  );
  const removeRooms = useCallback(
    (id: number) => dispatch(actions.removeRooms(id)),
    [dispatch],
  );
  const removeFloors = useCallback(
    (id: number) => dispatch(actions.removeFloor(id)),
    [dispatch],
  );
  const resetUpdates = useCallback(
    () => dispatch(actions.removeMinMaxUpdates()),
    [dispatch],
  );

  return {
    floors: minmaxState.floorsToUpdate,
    prices: minmaxState.pricesToUpdate,
    rooms: minmaxState.roomsToUpdate,
    hasUpdates: minmaxState.hasChanges,
    loadings: {
      loading: minmaxState.loading,
      loadingSave: minmaxState.loadingSave,
    },
    loadValues,
    saveValues,
    updatePrice,
    updateFloors,
    addPrice,
    addFloors,
    removePrice,
    removeFloors,
    resetUpdates,
    addRooms,
    updateRooms,
    removeRooms,
  };
};
