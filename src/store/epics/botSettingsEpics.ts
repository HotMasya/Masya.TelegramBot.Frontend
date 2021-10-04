import { Epic } from 'redux-observable';
import { actions, RootAction } from '..';
import { RootState } from '../reducers';
import { of } from 'rxjs';
import { filter, catchError, switchMap, mapTo, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { isActionOf } from 'typesafe-actions';
import { apiEndpoints } from '../../routing/endpoints';
import { BotSettings } from '../../models/BotSettings';
import { Log } from '../../models/Log';

export const startImportsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf(actions.startImporting)),
    switchMap(() =>
      ajax({
        url: apiEndpoints.startImporting,
        crossDomain: true,
        method: 'get',
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
      }).pipe(mapTo(actions.startImportingSuccess())),
    ),
  );

export const loadBotLogsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf(actions.loadBotLogs)),
    switchMap(() =>
      ajax<Log[]>({
        url: apiEndpoints.loadBotLogs,
        method: 'get',
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
      }).pipe(
        map((ctx) => actions.loadBotLogsSuccess(ctx.response.reverse())),
        catchError((ctx) => of(actions.loadBotLogsError(ctx.xhr.response))),
      ),
    ),
  );

export const loadBotSettingsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf(actions.loadBotSettings)),
    switchMap(() =>
      ajax<BotSettings>({
        url: apiEndpoints.loadBotSettings,
        method: 'get',
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
      }).pipe(
        map((ctx) => actions.setBotSettings(ctx.response)),
        catchError((ctx) => of(actions.loadBotSettingsError(ctx.xhr.response))),
      ),
    ),
  );

export const saveBotSettingsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state,
) =>
  action$.pipe(
    filter(isActionOf(actions.saveBotSettings)),
    switchMap(() =>
      ajax({
        url: apiEndpoints.saveBotSettings,
        method: 'post',
        crossDomain: true,
        body: state.value.botStatus.botSettingsUpdates,
        headers: {
          Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
        },
      }).pipe(
        mapTo(actions.saveBotSettingsSuccess()),
        catchError((ctx) => of(actions.saveBotSettingsError(ctx.xhr.response))),
      ),
    ),
  );
