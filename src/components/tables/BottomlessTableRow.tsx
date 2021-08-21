import { TableRow, withStyles } from '@material-ui/core';

const BottomlessTableRow = withStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})(TableRow);

export default BottomlessTableRow;
