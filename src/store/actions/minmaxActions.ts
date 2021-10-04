import { createStandardAction } from 'typesafe-actions';
import { useMinMaxValues } from '../../hooks';
import { MinMaxValue, MinMaxValues, Room } from '../../models';
import { MinMaxActionTypes } from '../action-types';

export const loadMinMax = createStandardAction(
  MinMaxActionTypes.LOAD_MIN_MAX_VALUES,
)();
export const loadMinMaxSuccess = createStandardAction(
  MinMaxActionTypes.LOAD_MIN_MAX_VALUES_SUCCESS,
)<MinMaxValues>();
export const updatePrice = createStandardAction(MinMaxActionTypes.UPDATE_PRICE)<
  Partial<MinMaxValue>
>();
export const updateFloors = createStandardAction(
  MinMaxActionTypes.UPDATE_FLOORS,
)<Partial<MinMaxValue>>();
export const addFloors = createStandardAction(MinMaxActionTypes.ADD_FLOORS)<
  Partial<MinMaxValue>
>();
export const addPrice = createStandardAction(MinMaxActionTypes.ADD_PRICE)<
  Partial<MinMaxValue>
>();
export const saveValues = createStandardAction(
  MinMaxActionTypes.SAVE_MINMAXVALUES,
)();
export const saveValuesSuccess = createStandardAction(
  MinMaxActionTypes.SAVE_MINMAXVALUES_SUCCESS,
)();
export const saveValuesError = createStandardAction(
  MinMaxActionTypes.SAVE_MINMAXVALUES_ERROR,
)<Error>();
export const removeMinMaxUpdates = createStandardAction(
  MinMaxActionTypes.REMOVE_UPDATES,
)();
export const removePrice = createStandardAction(
  MinMaxActionTypes.REMOVE_PRICE,
)<number>();
export const removeFloor = createStandardAction(
  MinMaxActionTypes.REMOVE_FLOORS,
)<number>();
export const addRooms = createStandardAction(MinMaxActionTypes.ADD_ROOMS)<
  Partial<Room>
>();
export const removeRooms = createStandardAction(
  MinMaxActionTypes.REMOVE_ROOMS,
)<number>();
export const updateRooms = createStandardAction(MinMaxActionTypes.UPDATE_ROOMS)<
  Partial<Room>
>();
