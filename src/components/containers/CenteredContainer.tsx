import { Container, createStyles, Theme, withStyles } from '@material-ui/core';

export const CenteredContainer = withStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
  }),
)(Container);
