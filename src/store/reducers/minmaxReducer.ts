import { createReducer } from 'typesafe-actions';
import { RootAction } from '..';
import { MinMaxValue, Room } from '../../models';
import * as actions from '../actions';

export interface MinMaxValuesState {
  floors?: MinMaxValue[];
  prices?: MinMaxValue[];
  rooms?: Room[];
  floorsToUpdate?: Partial<MinMaxValue>[];
  pricesToUpdate?: Partial<MinMaxValue>[];
  roomsToUpdate?: Partial<Room>[];
  hasChanges?: boolean;
  loading?: boolean;
  loadingSave?: boolean;
}

const initialState: MinMaxValuesState = {};

export const minmaxReducer = createReducer<MinMaxValuesState, RootAction>(
  initialState,
)
  .handleAction(actions.loadMinMax, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.loadMinMaxSuccess, (state, action) => ({
    ...state,
    loading: false,
    loadingSave: false,
    hasChanges: false,
    floors: action.payload.floors,
    prices: action.payload.prices,
    rooms: action.payload.rooms,
    floorsToUpdate: JSON.parse(JSON.stringify(action.payload.floors)),
    pricesToUpdate: JSON.parse(JSON.stringify(action.payload.prices)),
    roomsToUpdate: JSON.parse(JSON.stringify(action.payload.rooms)),
  }))
  .handleAction(actions.addFloors, (state, action) => {
    if (!state.floorsToUpdate) {
      return state;
    }

    const floors = [...state.floorsToUpdate];

    floors.push(action.payload);
    return {
      ...state,
      floorsToUpdate: floors,
      hasChanges: true,
    };
  })
  .handleAction(actions.addRooms, (state, action) => {
    if (!state.roomsToUpdate) {
      return state;
    }

    const rooms = [...state.roomsToUpdate];

    rooms.push(action.payload);

    return {
      ...state,
      roomsToUpdate: rooms,
      hasChanges: true,
    };
  })
  .handleAction(actions.updateRooms, (state, action) => {
    const target = state.roomsToUpdate?.find((r) => r.id === action.payload.id);

    if (!target) {
      return state;
    }

    target.roomsCount = action.payload.roomsCount ?? target.roomsCount;

    if (JSON.stringify(state.roomsToUpdate) === JSON.stringify(state.rooms)) {
      return {
        ...state,
        hasChanges: false,
      };
    }

    return {
      ...state,
      hasChanges: true,
    };
  })
  .handleAction(actions.removeRooms, (state, action) => {
    const roomsToUpdate = state.roomsToUpdate?.filter(
      (r) => r.id !== action.payload,
    );

    if (JSON.stringify(roomsToUpdate) === JSON.stringify(state.rooms)) {
      return {
        ...state,
        roomsToUpdate,
        hasChanges: false,
      };
    }

    return {
      ...state,
      roomsToUpdate,
      hasChanges: true,
    };
  })
  .handleAction(actions.addPrice, (state, action) => {
    if (!state.pricesToUpdate) {
      return state;
    }
    const prices = [...state.pricesToUpdate];

    prices.push(action.payload);

    return {
      ...state,
      pricesToUpdate: prices,
      hasChanges: true,
    };
  })
  .handleAction(actions.updateFloors, (state, action) => {
    const target = state.floorsToUpdate?.find(
      (f) => f.id === action.payload.id,
    );

    if (!target) {
      return state;
    }

    target.maxVal = action.payload.maxVal ?? target.maxVal;
    target.minVal = action.payload.minVal ?? target.minVal;

    if (JSON.stringify(state.floorsToUpdate) === JSON.stringify(state.floors)) {
      return {
        ...state,
        hasChanges: false,
      };
    }

    return {
      ...state,
      hasChanges: true,
    };
  })
  .handleAction(actions.updatePrice, (state, action) => {
    const target = state.pricesToUpdate?.find(
      (f) => f.id === action.payload.id,
    );

    if (!target) {
      return state;
    }

    target.maxVal = action.payload.maxVal ?? target.maxVal;
    target.minVal = action.payload.minVal ?? target.minVal;

    if (JSON.stringify(state.pricesToUpdate) === JSON.stringify(state.prices)) {
      return {
        ...state,
        hasChanges: false,
      };
    }

    return {
      ...state,
      hasChanges: true,
    };
  })
  .handleAction(actions.saveValues, (state) => ({
    ...state,
    loadingSave: true,
  }))
  .handleAction(actions.removeMinMaxUpdates, (state) => ({
    ...state,
    floorsToUpdate: JSON.parse(JSON.stringify(state.floors)),
    pricesToUpdate: JSON.parse(JSON.stringify(state.prices)),
    roomsToUpdate: JSON.parse(JSON.stringify(state.rooms)),
    hasChanges: false,
  }))
  .handleAction(actions.removePrice, (state, action) => {
    const pricesToUpdate = state.pricesToUpdate?.filter(
      (f) => f.id !== action.payload,
    );

    if (JSON.stringify(pricesToUpdate) === JSON.stringify(state.prices)) {
      return {
        ...state,
        pricesToUpdate,
        hasChanges: false,
      };
    }

    return {
      ...state,
      pricesToUpdate,
      hasChanges: true,
    };
  })
  .handleAction(actions.removeFloor, (state, action) => {
    const floorsToUpdate = state.floorsToUpdate?.filter(
      (f) => f.id !== action.payload,
    );

    if (JSON.stringify(floorsToUpdate) === JSON.stringify(state.floors)) {
      return {
        ...state,
        floorsToUpdate,
        hasChanges: false,
      };
    }

    return {
      ...state,
      floorsToUpdate,
      hasChanges: true,
    };
  });
