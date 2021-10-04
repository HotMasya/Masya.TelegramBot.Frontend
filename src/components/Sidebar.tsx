import {
  createStyles,
  ListItemIcon,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Divider,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  withStyles,
  SwipeableDrawer,
  IconButton,
  Box,
  ListItemProps,
} from '@material-ui/core';
import React from 'react';
import {
  Category,
  Keyboard,
  Tune,
  Code,
  MenuBook,
  ExpandMore,
  Person,
  BusinessCenter,
  Close,
} from '@material-ui/icons';
import globals from '../globals';
import { Link, useLocation } from 'react-router-dom';
import { dashboardEndpoints } from '../routing/endpoints';
import { Permission } from '../models/User';
import { useAuth } from '../hooks';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listContainer: {
      width: globals.drawerWidth,
      flexShrink: 0,
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
        textAlign: 'center',
      },
    },
    sidebarHeaderText: {
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(4),
      },
      width: '100%',
      textAlign: 'center',
    },
    drawerHeader: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: theme.spacing(2, 2),
    },
    disabledLink: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 100 : 900],
    },
  }),
);

export const SidebarAccordion = withStyles((theme: Theme) =>
  createStyles({
    expanded: {
      backgroundColor: theme.palette.action.focus,
      '&$expanded': {
        margin: 0,
        padding: 0,
      },
    },
  }),
)(Accordion);

export const LinkListItem: React.FC<{ location: string }> = ({
  location,
  children,
}) => {
  const { pathname } = useLocation();
  const { disabledLink } = useStyles();

  return (
    <ListItem
      button
      component={Link}
      to={location}
      classes={{ disabled: disabledLink }}
      disabled={pathname === location}>
      {children}
    </ListItem>
  );
};

export interface SidebarProps {
  onOpen: () => void;
  onClose: () => void;
  onCloseClick: (event: React.MouseEvent) => void;
  open: boolean;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const theme = useTheme();

  const breakpoint = theme.breakpoints.down('sm');
  const isDowmSm = useMediaQuery(breakpoint);
  const drawerVar = isDowmSm ? 'temporary' : 'permanent';
  const classes = useStyles();
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { onOpen, onClose, onCloseClick, open } = props;
  const {
    account: { user },
  } = useAuth();

  return (
    <SwipeableDrawer
      PaperProps={{ style: { borderRight: 'none' } }}
      anchor="left"
      variant={drawerVar}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={open}
      onOpen={onOpen}
      onClose={onClose}>
      <Box className={classes.drawerHeader}>
        <Typography
          display="block"
          variant="h4"
          className={classes.sidebarHeaderText}>
          {globals.appName}
        </Typography>
        {isDowmSm && (
          <IconButton onClick={onCloseClick}>
            <Close />
          </IconButton>
        )}
      </Box>
      <List className={classes.listContainer}>
        <Divider />
        {user?.permission && user?.permission >= Permission.Admin && (
          <LinkListItem location={dashboardEndpoints.home}>
            <ListItemIcon>
              <Tune fontSize="medium" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6">Bot Settings</Typography>
            </ListItemText>
          </LinkListItem>
        )}
        {user?.permission &&
          user.permission >= Permission.Admin &&
          user?.agencyName && (
            <LinkListItem location={dashboardEndpoints.agency}>
              <ListItemIcon>
                <BusinessCenter fontSize="medium" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">Agency</Typography>
              </ListItemText>
            </LinkListItem>
          )}
        {user?.permission && user?.permission >= Permission.SuperAdmin && (
          <LinkListItem location={dashboardEndpoints.commands}>
            <ListItemIcon>
              <Code fontSize="medium" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6">Commands</Typography>
            </ListItemText>
          </LinkListItem>
        )}
        {user?.permission && user?.permission >= Permission.SuperAdmin && (
          <LinkListItem location={dashboardEndpoints.keyboards}>
            <ListItemIcon>
              <Keyboard fontSize="medium" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6">Inline keyboards settings</Typography>
            </ListItemText>
          </LinkListItem>
        )}
        {user?.permission && user?.permission >= Permission.SuperAdmin && (
          <SidebarAccordion style={{ borderRadius: 0 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <ListItemIcon style={{ marginTop: theme.spacing(1) }}>
                <MenuBook color="action" fontSize="medium" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6" align="left">
                  Directories
                </Typography>
              </ListItemText>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0 }}>
              <List style={{ width: '100%' }}>
                <LinkListItem location={dashboardEndpoints.usersTable}>
                  <ListItemIcon>
                    <Person fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6" align="left">
                      Users
                    </Typography>
                  </ListItemText>
                </LinkListItem>
                <ListItem button>
                  <ListItemIcon>
                    <BusinessCenter fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6">Agencies</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Category fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6">Categories</Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </AccordionDetails>
          </SidebarAccordion>
        )}
      </List>
    </SwipeableDrawer>
  );
};
