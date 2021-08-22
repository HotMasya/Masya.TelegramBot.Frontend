import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContentBox from './containers/ContentBox';
import Header from './Header';
import MiniProfile from './MiniProfile';
import { Box, Button, Popover, Typography, useTheme } from '@material-ui/core';
import { Redirect } from 'react-router';
import { endpoints } from '../routing/endpoints';
import { useAuth } from '../hooks';

import fakeAvatar from '../static/images/fake_avatar.jpg';

const Layout: React.FC = (props) => {
  const theme = useTheme();
  const { children } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element>();
  const onPopoverClose = () => {
    setAnchorEl(undefined);
  };
  const onProfileClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const isPopoverOpen = Boolean(anchorEl);
  const {
    account: { user },
    logout,
  } = useAuth();
  if (!user) {
    return <Redirect to={endpoints.auth} />;
  }
  const onLogOutClick = () => {
    logout();
  };

  return (
    <>
      <Sidebar
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
        onCloseClick={() => setSidebarOpen(false)}
        open={sidebarOpen}
      />
      <ContentBox>
        <Header onMenuClick={() => setSidebarOpen((state) => !state)}>
          <MiniProfile
            firstName={user.firstName}
            lastName={user.lastName}
            avatar={fakeAvatar}
            onClick={onProfileClick}
          />
          <Popover
            onClose={onPopoverClose}
            anchorEl={anchorEl}
            open={isPopoverOpen}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
            <Button onClick={onLogOutClick}>
              <Typography variant="h5" color="error">
                Log Out
              </Typography>
            </Button>
          </Popover>
        </Header>
        <Box style={{ padding: theme.spacing(3) }}>{children}</Box>
      </ContentBox>
    </>
  );
};

export default Layout;
