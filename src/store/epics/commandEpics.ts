import { Epic } from 'redux-observable';
import { actions, RootAction } from '..';
import { catchError, map, of } from 'rxjs';
import { switchMap, filter, mapTo } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { RootState } from '../reducers';
import { isActionOf } from 'typesafe-actions';
import { apiEndpoints } from '../../routing/endpoints';
import { Command } from '../../models/Command';

export const loadKeyboardsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state
) =>
  action$.pipe(
    filter(isActionOf(actions.loadCommands)),
    switchMap((action) =>
      ajax<Command[]>({
        url: apiEndpoints.loadCommands,
        method: 'get',
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
        crossDomain: true,
      }).pipe(
        map((ctx) => actions.setCommands(ctx.response)),
        catchError((err) => of(actions.errorCommands(err.xhr.response))),
      ),
    ),
  );

export const saveKeyboardsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf(actions.saveCommands)),
    switchMap(() =>
      ajax({
        url: apiEndpoints.saveCommands,
        method: 'put',
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
        crossDomain: true,
        body: state.value.commands.commands,
      }).pipe(
        mapTo(actions.saveSuccess()),
        catchError((err) => of(actions.errorCommands(err.xhr.response))),
      ),
    ),
  );
