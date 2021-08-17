import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { RootState } from '../reducers';
import * as actions from '../actions';
import { of } from 'rxjs';
import { filter, catchError, switchMap, mapTo, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Tokens } from 'src/models/Token';
import { RootAction } from '..';
import { User } from '../../models/User';
import { apiEndpoints } from '../../routing/endpoints';

export const getUserEpic: Epic<RootAction, RootAction, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf([actions.setTokens, actions.getUser])),
    switchMap((action) =>
      ajax<User>({
        url: apiEndpoints.getUserInfo,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${action.payload.accessToken}`,
        },
        crossDomain: true,
      }).pipe(
        map((ctx) => actions.setUser(ctx.response)),
        catchError((err) => of(actions.userError(err.xhr.response))),
      ),
    ),
  );

export const phoneEpic: Epic<RootAction, RootAction, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.checkPhone)),
    switchMap((action) =>
      ajax({
        url: apiEndpoints.checkPhone,
        method: 'POST',
        body: {
          phoneNumber: action.payload,
        },
        crossDomain: true,
      }).pipe(
        mapTo(actions.checkPhoneSuccess()),
        catchError((err) => of(actions.checkPhoneFailure(err.xhr.response))),
      ),
    ),
  );

export const codeEpic: Epic<RootAction, RootAction, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.checkCode)),
    switchMap((action) =>
      ajax<Tokens>({
        url: apiEndpoints.checkCode,
        method: 'POST',
        body: {
          code: action.payload.code,
          phoneNumber: action.payload.phone,
        },
        crossDomain: true,
      }).pipe(
        map((data) => {
          const tokens = data.response;
          if (tokens?.accessToken) {
            localStorage.setItem('x-access-token', tokens.accessToken);
          }

          if (tokens?.refreshToken) {
            localStorage.setItem('x-refresh-token', tokens.refreshToken);
          }
          return actions.setTokens(tokens);
        }),
        catchError((err) => {
          return of(actions.checkCodeFailure(err.xhr.response));
        }),
      ),
    ),
  );

export const refreshToken: Epic<RootAction, RootAction, RootState> = (
  action$,
) =>
  action$.pipe(
    filter(isActionOf(actions.tokenRefresh)),
    switchMap((action) =>
      ajax<Tokens>({
        url: apiEndpoints.refreshToken,
        method: 'post',
        body: {
          refreshToken: action.payload,
        },
        crossDomain: true,
      }).pipe(
        map((ctx) => {
          const accessToken = ctx.response?.accessToken;
          if (accessToken) {
            localStorage.setItem('x-access-token', accessToken);
          }
          return actions.setTokens(ctx.response);
        }),
        catchError((err) => of(actions.tokenRefreshError(err.xhr.response))),
      ),
    ),
  );
