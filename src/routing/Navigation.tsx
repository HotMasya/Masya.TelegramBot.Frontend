import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import BotSettingsPage from '../pages/BotSettingsPage';
import PrivateRoute from './PrivateRoute';
import { dashboardEndpoints, endpoints } from './endpoints';
import { Permission } from '../models/User';
import CommandsPage from '../pages/CommandsPage';
import { RootState } from '../store/reducers';
import { RootAction, actions } from '../store';
import KeyboardsPage from '../pages/KeyboardsPage';

const Navigation: React.FC = () => {
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
            user ? <Redirect to={dashboardEndpoints.home} /> : <AuthPage />
          }
        />
        <PrivateRoute
          permission={Permission.Admin}
          exact
          path={dashboardEndpoints.home}
          render={() => <BotSettingsPage />}
        />
        <PrivateRoute
          permission={Permission.SuperAdmin}
          path={dashboardEndpoints.commands}
          render={() => <CommandsPage />}
        />
        <PrivateRoute
          permission={Permission.SuperAdmin}
          path={dashboardEndpoints.keyboards}
          render={() => <KeyboardsPage />}
        />
        <Route
          path="*"
          render={() => <Redirect to={dashboardEndpoints.home} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;
