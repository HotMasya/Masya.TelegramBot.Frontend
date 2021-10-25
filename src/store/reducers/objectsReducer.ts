import { createReducer } from 'typesafe-actions';
import { RootAction } from '..';
import { Category, DirectoryItem, RealtyObject } from '../../models';
import * as actions from '../actions';

export type ObjectsState = {
  realtyObjects?: RealtyObject[];
  realtyObjectsToUpdate?: Partial<RealtyObject>[];
  loading?: boolean;
  loadingSave?: boolean;
  loadingLogs?: boolean;
  hasUpdates: boolean;
  loadError?: Error;
  saveError?: Error;

  states?: DirectoryItem[];
  wallMaterials?: DirectoryItem[];
  categories?: Category[];
  districts?: DirectoryItem[];
  streets?: DirectoryItem[];
};

const initialState: ObjectsState = {
  hasUpdates: false,
};

export const objectsReducer = createReducer<ObjectsState, RootAction>(
  initialState,
)
  .handleAction(actions.loadObjects, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.saveObjects, (state) => ({
    ...state,
    loadingSave: true,
  }))
  .handleAction(actions.loadObjectsSuccess, (state, action) => ({
    ...state,
    realtyObjects: action.payload.objects,
    realtyObjectsToUpdate: JSON.parse(
      JSON.stringify(action.payload.objects),
    ) as RealtyObject[],
    states: action.payload.states,
    wallMaterials: action.payload.wallMaterials,
    streets: action.payload.streets,
    districts: action.payload.districts,
    categories: action.payload.categories,
    loading: false,
    hasUpdates: false,
  }))
  .handleAction(actions.saveObjectsError, (state, action) => ({
    ...state,
    saveError: action.payload,
    loadingSave: false,
  }))
  .handleAction(actions.removeObject, (state, action) => {
    if (!state.realtyObjectsToUpdate?.length) {
      return state;
    }

    const newRealtyObjects = state.realtyObjectsToUpdate?.filter(
      (ro) => ro.id !== action.payload,
    );

    if (
      !newRealtyObjects ||
      newRealtyObjects.length === state.realtyObjectsToUpdate?.length
    ) {
      return state;
    }

    return {
      ...state,
      realtyObjectsToUpdate: newRealtyObjects,
      hasUpdates:
        JSON.stringify(newRealtyObjects) !==
        JSON.stringify(state.realtyObjects),
    };
  })
  .handleAction(actions.addObject, (state, action) => {
    if (!state.realtyObjectsToUpdate) {
      return state;
    }

    const realtyObjectsToUpdate = [...state.realtyObjectsToUpdate];
    realtyObjectsToUpdate.unshift(action.payload);
    return { ...state, hasUpdates: true, realtyObjectsToUpdate };
  })
  .handleAction(actions.loadObjectsError, (state, action) => ({
    ...state,
    loadError: action.payload,
  }))
  .handleAction(actions.saveObjectsSuccess, (state) => ({
    ...state,
    loadingSave: false,
    hasUpdates: false,
  }))
  .handleAction(actions.updateObject, (state, action) => {
    const target = state.realtyObjectsToUpdate?.find(
      (ro) => ro.id === action.payload?.id,
    );

    if (!target) {
      return state;
    }

    console.log(target.streetId, action.payload.streetId);

    target.categoryId = action.payload.categoryId ?? target.categoryId;
    target.streetId = action.payload.streetId ?? target.streetId;
    target.districtId = action.payload.districtId ?? target.districtId;
    target.wallMaterialId =
      action.payload.wallMaterialId ?? target.wallMaterialId;
    target.stateId = action.payload.stateId ?? target.stateId;
    target.totalArea = action.payload.totalArea ?? target.totalArea;
    target.livingSpace = action.payload.livingSpace ?? target.livingSpace;
    target.kitchenSpace = action.payload.kitchenSpace ?? target.kitchenSpace;
    target.lotArea = action.payload.lotArea ?? target.lotArea;
    target.floor = action.payload.floor ?? target.floor;
    target.totalFloors = action.payload.totalFloors ?? target.totalFloors;
    target.rooms = action.payload.rooms ?? target.rooms;
    target.price = action.payload.price ?? target.price;
    target.price = action.payload.price ?? target.price;
    target.price = action.payload.price ?? target.price;
    target.description = action.payload.description ?? target.description;

    return {
      ...state,
      hasUpdates:
        JSON.stringify(state.realtyObjects) !==
        JSON.stringify(state.realtyObjectsToUpdate),
    };
  })
  .handleAction(actions.removeObjectsUpdates, (state) => ({
    ...state,
    hasUpdates: false,
    realtyObjectsToUpdate: JSON.parse(JSON.stringify(state.realtyObjects)),
  }));
