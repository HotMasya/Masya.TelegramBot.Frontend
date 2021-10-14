import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { dashboardEndpoints, endpoints } from './endpoints';
import { RootState } from '../store/reducers';
import { RootAction, actions } from '../store';
import { Permission } from '../models';
import * as Pages from '../pages';

export const Navigation: React.FC = () => {
  const { tokens, user } = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch<Dispatch<RootAction>>();
  if (tokens?.refreshToken) {
    dispatch(actions.tokenRefresh(tokens.refreshToken));
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={endpoints.auth}
          render={() =>
            user ? (
              <Redirect to={dashboardEndpoints.home} />
            ) : (
              <Pages.AuthPage />
            )
          }
        />
        <PrivateRoute
          permission={Permission.Admin}
          exact
          path={dashboardEndpoints.home}
          render={() => <Pages.BotSettingsPage />}
        />
        <PrivateRoute
          permission={Permission.Admin}
          exact
          path={dashboardEndpoints.agency}
          render={() => <Pages.AgencyPage />}
        />
        <PrivateRoute
          permission={Permission.SuperAdmin}
          path={dashboardEndpoints.commands}
          render={() => <Pages.CommandsPage />}
        />
        <PrivateRoute
          permission={Permission.SuperAdmin}
          path={dashboardEndpoints.keyboards}
          render={() => <Pages.KeyboardsPage />}
        />
        <PrivateRoute
          permission={Permission.SuperAdmin}
          path={dashboardEndpoints.usersTable}
          render={() => <Pages.UsersTablePage />}
        />
        <PrivateRoute
          permission={Permission.SuperAdmin}
          path={dashboardEndpoints.agencies}
          render={() => <Pages.AgenciesPage />}
        />
        <Route
          path="*"
          render={() => <Redirect to={dashboardEndpoints.home} />}
        />
      </Switch>
    </BrowserRouter>
  );
};
