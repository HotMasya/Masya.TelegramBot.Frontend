import { createStandardAction } from 'typesafe-actions';
import { RealtyObject } from '../../models';
import { ObjectsActionTypes } from '../action-types';

export const loadObjects = createStandardAction(
  ObjectsActionTypes.LOAD_OBJECTS,
)();
export const loadObjectsSuccess = createStandardAction(
  ObjectsActionTypes.LOAD_OBJECTS_SUCCESS,
)<RealtyObject[]>();
export const loadObjectsError = createStandardAction(
  ObjectsActionTypes.LOAD_OBJECTS_ERROR,
)<Error>();
export const saveObjects = createStandardAction(
  ObjectsActionTypes.SAVE_OBJECTS,
)();
export const saveObjectsSuccess = createStandardAction(
  ObjectsActionTypes.SAVE_OBJECTS_SUCCESS,
)();
export const saveObjectsError = createStandardAction(
  ObjectsActionTypes.SAVE_OBJECTS_ERROR,
)<Error>();
export const addObject = createStandardAction(ObjectsActionTypes.ADD_OBJECT)<
  Partial<RealtyObject>
>();
export const removeObject = createStandardAction(
  ObjectsActionTypes.REMOVE_OBJECT,
)<number>();
export const updateObjects = createStandardAction(
  ObjectsActionTypes.UPDATE_OBJECT,
)<Partial<RealtyObject>>();
export const removeObjectsUpdates = createStandardAction(
  ObjectsActionTypes.REMOVE_OBJECTS_UPDATES,
)();
