import { Tooltip } from '@material-ui/core';
import { Cancel, DoneOutline } from '@material-ui/icons';
import React from 'react';

export interface BoolProps {
  value: boolean;
}

export const Bool: React.FC<BoolProps> = (props) => {
  return (
    <Tooltip title={props.value ? 'Yes' : 'No'} arrow>
      {props.value ? <DoneOutline color="primary" /> : <Cancel color="error" />}
    </Tooltip>
  );
};
