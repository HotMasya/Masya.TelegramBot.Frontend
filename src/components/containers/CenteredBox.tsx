import { Box, styled } from '@material-ui/core';

export const CenteredBox = styled(Box)({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  },
});
