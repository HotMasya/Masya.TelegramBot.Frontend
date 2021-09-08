import { Box, createStyles, Theme, withStyles } from '@material-ui/core';
import globals from '../../globals';

export const ContentBox = withStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${globals.drawerWidth}px)`,
        marginLeft: globals.drawerWidth,
      },
    },
  }),
)(Box);
