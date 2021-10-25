import { Epic } from 'redux-observable';
import { RootAction } from '..';
import { Agency } from '../../models';
import { RootState } from '../reducers';
import { apiEndpoints } from '../../routing/endpoints';
import * as actions from '../actions';
import { filter, catchError, switchMap, map, mapTo } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

export const loadAgenciesEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf([actions.loadAgencies, actions.saveAgenciesSuccess])),
    switchMap(() =>
      ajax<Agency[]>({
        url: apiEndpoints.loadAgencies,
        crossDomain: true,
        method: 'get',
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
      }).pipe(
        map((ctx) => actions.loadAgenciesSuccess(ctx.response)),
        catchError((ctx) => of(actions.loadAgenciesError(ctx.xhr.response))),
      ),
    ),
  );

export const saveAgenciesEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf(actions.saveAgencies)),
    switchMap(() =>
      ajax({
        url: apiEndpoints.saveAgencies,
        method: 'post',
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
        crossDomain: true,
        body: state.value.agencies.agenciesToUpdate?.map((a) => ({
          ...a,
          id: !a.id || a.id <= 0 ? null : a.id,
        })),
      }).pipe(
        mapTo(actions.saveAgenciesSuccess()),
        catchError((err) => of(actions.saveAgenciesError(err.xhr.response))),
      ),
    ),
  );
