import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Slide,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

export interface BlockUserDialogProps extends DialogProps {
  userFirstName: string;
  userLastName?: string;
  onDialogCancel: () => void;
  onBlockClick: (reason?: string) => boolean;
}

export const BlockUserDialog: React.FC<BlockUserDialogProps> = (props) => {
  const { open, userFirstName, userLastName, onDialogCancel, onBlockClick } =
    props;
  const [dialogOpen, setDialogOpen] = useState<boolean | undefined>();
  const [blockReason, setBlockReason] = useState<string | undefined>();
  const fullName = userFirstName + (userLastName ? ' ' + userLastName : '');

  const onClick = () => {
    if (onBlockClick(blockReason)) {
      setBlockReason(undefined);
    }
  };

  const onCancelClicked = () => {
    setBlockReason(undefined);
    setDialogOpen(false);
    onDialogCancel();
  };

  return (
    <Dialog
      open={dialogOpen ?? open}
      TransitionProps={{
        onExited: () => {
          setDialogOpen(undefined);
        },
      }}
      TransitionComponent={Slide}>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to block {fullName}?
        </DialogContentText>
        <TextField
          autoFocus
          label="Block Reason"
          fullWidth
          defaultValue={blockReason}
          onChange={(e) => setBlockReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={onCancelClicked}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onClick}>
          Block
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockUserDialog;
