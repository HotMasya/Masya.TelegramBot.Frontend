import { Epic } from 'redux-observable';
import { RootAction } from '..';
import { ObjectsReponse } from '../../models';
import { RootState } from '../reducers';
import { apiEndpoints } from '../../routing/endpoints';
import * as actions from '../actions';
import { filter, catchError, switchMap, map, mapTo } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

export const loadObjectsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf([actions.loadObjects, actions.saveObjectsSuccess])),
    switchMap(() =>
      ajax<ObjectsReponse>({
        url: apiEndpoints.loadObjects,
        crossDomain: true,
        method: 'get',
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
      }).pipe(
        map((ctx) => actions.loadObjectsSuccess(ctx.response)),
        catchError((ctx) => of(actions.loadObjectsError(ctx.xhr.response))),
      ),
    ),
  );

export const saveObjectsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf(actions.saveObjects)),
    switchMap(() =>
      ajax({
        url: apiEndpoints.saveObjects,
        method: 'post',
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
        crossDomain: true,
        body: state.value.objects.realtyObjectsToUpdate?.map((ro) => ({
          ...ro,
          id: !ro.id || ro.id <= 0 ? null : ro.id,
        })),
      }).pipe(
        mapTo(actions.saveObjectsSuccess()),
        catchError((err) => of(actions.saveObjectsError(err.xhr.response))),
      ),
    ),
  );
