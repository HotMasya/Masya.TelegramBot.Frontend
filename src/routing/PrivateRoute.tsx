import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Permission } from '../models/User';
import { RootState } from '../store/reducers';
import { endpoints } from './endpoints';

export interface PrivateRouteProps extends RouteProps {
  permission: Permission;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { permission, ...rest } = props;
  const { account: { user } } = useAuth();

  if (!user || user?.permission < permission) {
    return <Redirect to={endpoints.auth} />;
  }

  return <Route {...rest} />;
};

export default PrivateRoute;
