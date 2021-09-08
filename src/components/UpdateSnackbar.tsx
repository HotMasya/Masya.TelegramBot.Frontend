import React from 'react';
import { Slide, Snackbar, SnackbarContent } from '@material-ui/core';
import { UpdateSnackbarActionProps, UpdateSnackbarAction } from '.';

export interface UpdateSnackbarProps extends UpdateSnackbarActionProps {
  open: boolean;
}

export const UpdateSnackbar: React.FC<UpdateSnackbarProps> = (props) => {
  const { open, ...actionsProps } = props;

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={Slide}>
      <SnackbarContent
        style={{ width: 600 }}
        message="You have unsaved changes."
        action={<UpdateSnackbarAction {...actionsProps} />}
      />
    </Snackbar>
  );
};
