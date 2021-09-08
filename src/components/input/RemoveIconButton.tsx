import { IconButton, Tooltip } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import React from 'react';

export interface RemoveIconButtonProps {
  onClick?: () => void;
  tooltipTitle: string;
}

export const RemoveIconButton: React.FC<RemoveIconButtonProps> = (props) => {
  const { onClick, tooltipTitle } = props;

  return (
    <Tooltip title={tooltipTitle} arrow>
      <IconButton onClick={onClick}>
        <HighlightOff />
      </IconButton>
    </Tooltip>
  );
};
