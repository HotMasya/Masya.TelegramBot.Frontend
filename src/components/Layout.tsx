import { Box, Checkbox, Popover, Tooltip, useTheme } from '@material-ui/core';
import { Brightness7, Brightness2 } from '@material-ui/icons';
import React, { Dispatch, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Sidebar, ContentBox, Header, MiniProfile, Profile } from '.';
import { useAuth } from '../hooks';
import { endpoints } from '../routing/endpoints';
import { RootAction, actions } from '../store';
import { RootState } from '../store/reducers';
import { base64ToSrc } from '../utils';

export const Layout: React.FC = (props) => {
  const theme = useTheme();
  const { children } = props;
  const themeState = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const { agencies } = useSelector((state: RootState) => state.agencies);
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

  useEffect(() => {
    if (!agencies) {
      dispatch(actions.loadAgencies());
    }
  }, [dispatch, agencies]);

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
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Tooltip title="Switch theme" arrow>
              <Checkbox
                checkedIcon={<Brightness7 fontSize="medium" />}
                icon={<Brightness2 fontSize="medium" />}
                value={themeState.theme === 'light'}
                onChange={() => dispatch(actions.toggleTheme())}
                color="default"
                style={{
                  color: 'white',
                }}
              />
            </Tooltip>
            <MiniProfile
              firstName={user.telegramFirstName}
              avatar={base64ToSrc(user.telegramAvatar ?? '')}
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
                agencyId={user.agencyId}
                onLogOutClick={onLogOutClick}
              />
            </Popover>
          </Box>
        </Header>
        <Box
          className="content"
          style={{
            padding: theme.spacing(3),
            overflow: 'auto',
            height: '93.4vh',
          }}>
          {children}
        </Box>
      </ContentBox>
    </>
  );
};
