import { Tooltip, useTheme } from '@material-ui/core';
import { Info, Error as ErrorIcon, Warning } from '@material-ui/icons';
import React from 'react';
import { LogLevel } from '../models/Log';

export interface LogLevelIndicatorProps {
  logLevel: LogLevel;
}

export const LogLevelIndicator: React.FC<LogLevelIndicatorProps> = (props) => {
  const { logLevel } = props;
  const theme = useTheme();

  switch (logLevel) {
    case 'Information':
      return (
        <Tooltip title={logLevel} arrow>
          <Info color="primary" />
        </Tooltip>
      );

    case 'Error':
      return (
        <Tooltip title={logLevel} arrow>
          <ErrorIcon color="error" />
        </Tooltip>
      );

    case 'Warning':
      return (
        <Tooltip title={logLevel} arrow>
          <Warning style={{ color: theme.palette.warning.main }} />
        </Tooltip>
      );

    default:
      throw new Error('Unknow log level type.');
  }
};
