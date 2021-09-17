import React, { useCallback } from 'react';
import background from '../static/images/auth_background.jpg';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { SubmitHandler } from 'react-hook-form';
import { AuthModel } from '../models';
import { apiEndpoints } from '../routing/endpoints';
import { useAuth } from '../hooks';
import { BackgroundImage, CenteredContainer, AuthForm } from '../components';

export const AuthPage: React.FC = () => {
  const theme = useTheme();
  const currentBreakpoint = theme.breakpoints.up('sm');
  const isUpMd = useMediaQuery(currentBreakpoint);
  const { account, checkPhone, login } = useAuth();

  const onSubmit: SubmitHandler<AuthModel> = useCallback(
    (model) => {
      if (account.loading) return;

      if (!account.checkPhoneSuccess) {
        checkPhone(model.phone);
      } else {
        login(model);
      }
    },
    [account.checkPhoneSuccess, login, checkPhone, account.loading],
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
