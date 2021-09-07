import { Box, Button, CircularProgress, useTheme } from '@material-ui/core';
import React from 'react';

export type UpdateSnackbarActionProps = {
  onCancelClick?: () => void;
  onSaveClick?: () => void;
  loading?: boolean;
};

const UpdateSnackbarAction: React.FC<UpdateSnackbarActionProps> = (props) => {
  const theme = useTheme();
  const { onCancelClick, onSaveClick, loading } = props;

  return (
    <Box>
      <Button
        disabled={loading}
        variant="outlined"
        color="secondary"
        onClick={onCancelClick}>
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: theme.spacing(1), minWidth: '5rem' }}
        onClick={onSaveClick}>
        {loading ? (
          <CircularProgress
            size="1.5rem"
            style={{ color: theme.palette.primary.contrastText }}
          />
        ) : (
          'Save'
        )}
      </Button>
    </Box>
  );
};

export default UpdateSnackbarAction;
