import { TableRow, withStyles } from '@material-ui/core';

export const BottomlessTableRow = withStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})(TableRow);
