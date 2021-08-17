import React, { Dispatch, useState } from 'react';
import Sidebar from './Sidebar';
import ContentBox from './containers/ContentBox';
import Header from './Header';
import MiniProfile from './MiniProfile';

import fakeAvatar from '../static/images/fake_avatar.jpg';
import { Box, Button, Popover, Typography, useTheme } from '@material-ui/core';
import { RootState } from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { endpoints } from '../routing/endpoints';
import { actions, RootAction } from '../store';

const Layout: React.FC = (props) => {
  const theme = useTheme();
  const { children } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element>();
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const onPopoverClose = () => {
    setAnchorEl(undefined);
  };
  const onProfileClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const isPopoverOpen = Boolean(anchorEl);
  const { user } = useSelector((state: RootState) => state.account);
  if (!user) {
    return <Redirect to={endpoints.auth} />;
  }
  const onLogOutClick = () => {
    dispatch(actions.clearUser());
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
        <Box style={{ padding: theme.spacing(3)}}>
          {children}
        </Box>
      </ContentBox>
    </>
  );
};

export default Layout;
