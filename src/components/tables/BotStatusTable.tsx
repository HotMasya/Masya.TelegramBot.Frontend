import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import React from 'react';
import { BotSettings } from '../../models';
import { TelegramUsername } from '..';

export interface BotStatusTableProps {
  botSettings: Partial<BotSettings>;
  loading?: boolean;
}

export const BotStatusTable: React.FC<BotStatusTableProps> = (props) => {
  const { botSettings, loading } = props;
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Full Name</Typography>
            </TableCell>
            <TableCell style={{ width: '80%' }}>
              {loading ? (
                <CircularProgress size="1.5rem" color="primary" />
              ) : (
                <Typography>
                  {botSettings.botUser?.first_name}{' '}
                  {botSettings.botUser?.last_name}
                </Typography>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Link</Typography>
            </TableCell>
            <TableCell style={{ width: '80%' }}>
              {loading ? (
                <CircularProgress size="1.5rem" color="primary" />
              ) : (
                <TelegramUsername username={botSettings.botUser?.username} />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Working status</Typography>
            </TableCell>
            <TableCell style={{ width: '80%' }}>
              {loading ? (
                <CircularProgress size="1.5rem" color="primary" />
              ) : botSettings.isEnabled ? (
                <Typography style={{ display: 'flex', alignItems: 'center' }}>
                  {' '}
                  <FiberManualRecord
                    style={{ color: theme.palette.success.main }}
                  />{' '}
                  Enabled
                </Typography>
              ) : (
                <Typography style={{ display: 'flex', alignItems: 'center' }}>
                  {' '}
                  <FiberManualRecord
                    style={{ color: theme.palette.error.main }}
                  />{' '}
                  Disabled
                </Typography>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
