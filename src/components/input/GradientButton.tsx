import { Button, createStyles, Theme, withStyles } from '@material-ui/core';

export const GradientButton = withStyles((theme: Theme) =>
  createStyles({
    root: {
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      color: theme.palette.common.white,
    },
  }),
)(Button);
