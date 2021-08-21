import React, { useCallback } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import AuthForm from '../components/AuthForm';
import CenteredContainer from '../components/containers/CenteredContainer';
import background from '../static/images/auth_background.jpg';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { SubmitHandler } from 'react-hook-form';
import { AuthModel } from '../models/Auth';
import { apiEndpoints } from '../routing/endpoints';
import { useAuth } from '../hooks';

const AuthPage: React.FC = () => {
  const theme = useTheme();
  const currentBreakpoint = theme.breakpoints.up('sm');
  const isUpMd = useMediaQuery(currentBreakpoint);
  const {account, checkPhone, login } = useAuth();

  const onSubmit: SubmitHandler<AuthModel> = useCallback(
    (model) => {
      if (!account.checkPhoneSuccess) {
        checkPhone(model.phone);
      } else {
        login(model);
      }
    },
    [account.checkPhoneSuccess, login, checkPhone],
  );

  return (
    <>
      {isUpMd && <BackgroundImage src={background} alt="background_image" />}
      <CenteredContainer>
        <AuthForm
          onSubmit={onSubmit}
          apiEndpoint={apiEndpoints.checkPhone}
          caption="Authorization"
        />
      </CenteredContainer>
    </>
  );
};

export default AuthPage;
