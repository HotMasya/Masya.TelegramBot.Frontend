import React, { Dispatch, useState } from 'react';
import Sidebar from './Sidebar';
import ContentBox from './containers/ContentBox';
import Header from './Header';
import MiniProfile from './MiniProfile';
import { Box, Checkbox, Popover, useTheme } from '@material-ui/core';
import { Redirect } from 'react-router';
import { endpoints } from '../routing/endpoints';
import { useAuth } from '../hooks';
import { Brightness2, Brightness7 } from '@material-ui/icons';
import { RootState } from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { RootAction } from '../store';
import * as actions from '../store/actions';
import Profile from './Profile';

const Layout: React.FC = (props) => {
  const theme = useTheme();
  const { children } = props;
  const themeState = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<Dispatch<RootAction>>();
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
          <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
            <Checkbox 
              checkedIcon={<Brightness7 fontSize="medium" />}
              icon={<Brightness2 fontSize="medium" />}
              value={themeState.theme === 'light'}
              onChange={() => dispatch(actions.toggleTheme())}
              color="default"
              style={{
                color: 'white'
              }}
            />
            <MiniProfile
              firstName={user.telegramFirstName}
              avatar={`data:image/jpg;base64, ${user.telegramAvatar}`}
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
              <Profile
                avatar={user.telegramAvatar}
                firstName={user.telegramFirstName}
                lastName={user.telegramLastName}
                permission={user.permission}
                agencyName={user.agencyName}
                onLogOutClick={onLogOutClick}
              />
            </Popover>
          </Box>     
        </Header>
        <Box style={{ padding: theme.spacing(3) }}>{children}</Box>
      </ContentBox>
    </>
  );
};

export default Layout;
