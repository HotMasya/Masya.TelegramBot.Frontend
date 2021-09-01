import { Epic } from "redux-observable";
import * as actions from "../actions";
import { RootState } from "../reducers";
import { filter, catchError, switchMap, mapTo, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { isActionOf } from "typesafe-actions";
import { RootAction } from "..";
import { ajax } from 'rxjs/ajax';
import { apiEndpoints } from "../../routing/endpoints";
import { UserView } from "../../models/UserView";

export const loadUsersEpic: Epic<RootAction, RootAction, RootState> = (action$, state) =>
    action$.pipe(
        filter(isActionOf(actions.loadUsers)),
        switchMap(() =>
            ajax<UserView[]>({
                url: apiEndpoints.loadUsers,
                crossDomain: true,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
                },
            }).pipe(
                map(ctx => actions.setUsers(ctx.response)),
                catchError(ctx => of(actions.loadUsersError(ctx.xhr.response)))
            ),
        ),
    );

export const saveUsersEpic: Epic<RootAction, RootAction, RootState> = (action$, state) =>
    action$.pipe(
        filter(isActionOf(actions.saveUsers)),
        switchMap(() =>
            ajax({
                url: apiEndpoints.loadUsers,
                crossDomain: true,
                method: 'get',
                body: state.value.users.usersToUpdate,
                headers: {
                    Authorization: `Bearer ${state.value.account.tokens?.accessToken}`,
                },
            }).pipe(
                mapTo(actions.saveUsersSuccess()),
                catchError(ctx => of(actions.saveUsersError(ctx.xhr.response)))
            ),
        ),
    );