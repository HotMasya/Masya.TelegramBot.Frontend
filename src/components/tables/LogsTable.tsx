import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { HeadTableCell } from '.';
import { Log } from '../../models/Log';
import { shortify } from '../../utils';
import { LogLevelIndicator } from '../LogLevelIndicator';

export interface LogsTableProps {
  logs?: Log[];
  loading?: boolean;
  onLoadClick?: () => void;
  emptyTableMessage?: string;
}

export const LogsTable: React.FC<LogsTableProps> = (props) => {
  const { logs, loading, onLoadClick, emptyTableMessage } = props;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <HeadTableCell width={50} align="center">
              Level
            </HeadTableCell>
            <HeadTableCell>Message</HeadTableCell>
            <HeadTableCell>Date</HeadTableCell>
            <HeadTableCell>Time</HeadTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow key="__loading_logs__">
              <TableCell colSpan={4}>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CircularProgress size="1.5em" color="primary" />
                  &nbsp;Loading logs...
                </Box>
              </TableCell>
            </TableRow>
          ) : !logs?.length ? (
            <TableRow key="__no_logs__">
              <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                <Typography>
                  {emptyTableMessage}
                  <Button color="primary" onClick={onLoadClick}>
                    Load logs
                  </Button>
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            logs.map((l) => {
              const time = new Date(l.timeStamp);
              time.setUTCHours(time.getUTCHours() + 3);
              return (
                <TableRow key={l.id}>
                  <TableCell align="center">
                    <LogLevelIndicator logLevel={l.level} />
                  </TableCell>
                  <TableCell>{shortify(l.message, 100)}</TableCell>
                  <TableCell>{time.toLocaleDateString()}</TableCell>
                  <TableCell>{time.toLocaleTimeString()}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
