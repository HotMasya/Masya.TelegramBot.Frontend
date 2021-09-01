import { createReducer } from "typesafe-actions";
import * as actions from "../actions";
import { UserView } from "../../models/UserView";
import { RootAction } from "..";

export type UsersState = {
    users?: UserView[];
    usersToUpdate?: UserView[];
    usersLoadError?: Error;
    usersSaveError?: Error;
}

const initialState: UsersState = {}

export const usersReducer = createReducer<UsersState, RootAction>(initialState)
    .handleAction(actions.setUsers, (state, action) => ({
        ...state,
        users: action.payload,
        usersToUpdate: {...action.payload}
    }))
    .handleAction(actions.loadUsersError, (state, action) => ({
        ...state,
        usersLoadError: action.payload,
    }))
    .handleAction(actions.saveUsersError, (state, action) => ({
        ...state,
        usersSaveError: action.payload
    }));