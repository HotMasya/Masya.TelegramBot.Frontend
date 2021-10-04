import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { RootAction } from '..';
import { RootState } from '../reducers';
import { MinMaxValues } from '../../models';
import * as actions from '../actions';
import { filter, switchMap, map, mapTo, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { apiEndpoints } from '../../routing/endpoints';

export const loadMinMaxEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf(actions.loadMinMax)),
    switchMap(() =>
      ajax<MinMaxValues>({
        url: apiEndpoints.loadMinMax,
        crossDomain: true,
        method: 'get',
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
      }).pipe(map((ctx) => actions.loadMinMaxSuccess(ctx.response))),
    ),
  );

export const saveMinMaxEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf(actions.saveValues)),
    switchMap(() =>
      ajax({
        url: apiEndpoints.saveMinMax,
        crossDomain: true,
        method: 'post',
        body: {
          prices: state.value.minMaxValues.pricesToUpdate?.map((p) => ({
            ...p,
            id: p?.id && p.id > 0 ? p.id : null,
          })),
          floors: state.value.minMaxValues.floorsToUpdate?.map((f) => ({
            ...f,
            id: f?.id && f.id > 0 ? f.id : null,
          })),
          rooms: state.value.minMaxValues.roomsToUpdate?.map((r) => ({
            ...r,
            id: r?.id && r.id > 0 ? r.id : null,
          })),
        } as MinMaxValues,
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
      }).pipe(
        mapTo(actions.loadMinMax()),
        catchError((ctx) => of(actions.saveValuesError(ctx.xhr.response))),
      ),
    ),
  );
