import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { base64ToSrc } from '../../utils';
import { Agent } from '../../models';
import { Remove } from '@material-ui/icons';
import { Bool, HeadTableCell, RemoveIconButton, TelegramUsername } from '..';

export interface AgentsTableProps {
  agents: Agent[];
  loading?: boolean;
}

export const AgentsTable: React.FC<AgentsTableProps> = (props) => {
  const { agents, loading } = props;
  const theme = useTheme();
  if (!agents) {
    return null;
  }

  return (
    <TableContainer component={Paper} style={{ margin: theme.spacing(3, 0) }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <HeadTableCell>Login</HeadTableCell>
            <HeadTableCell>Avatar</HeadTableCell>
            <HeadTableCell>Full name</HeadTableCell>
            <HeadTableCell>Phone</HeadTableCell>
            <HeadTableCell align="center">Blocked</HeadTableCell>
            <HeadTableCell align="center">Block Reason</HeadTableCell>
            <HeadTableCell align="center">Blocked by bot</HeadTableCell>
            <HeadTableCell align="center">Ignored</HeadTableCell>
            <HeadTableCell align="center">Note</HeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow key="agents_loading">
              <TableCell colSpan={9}>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CircularProgress size="1.5em" color="primary" />
                  Loading agents...
                </Box>
              </TableCell>
            </TableRow>
          ) : agents.length === 0 ? (
            <Typography>There are no agents in this agency.</Typography>
          ) : (
            agents.map((a) => (
              <TableRow key={a.telegramLogin}>
                <TableCell>
                  <RemoveIconButton tooltipTitle="Remove agent" />
                </TableCell>
                <TableCell>
                  <TelegramUsername username={a.telegramLogin} />
                </TableCell>
                <TableCell
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Avatar
                    src={base64ToSrc(a.telegramAvatar ?? '')}
                    alt="user avatar"
                  />
                </TableCell>
                <TableCell>
                  {a.telegramFirstName} {a.telegramLastName}
                </TableCell>
                <TableCell>{a.telegramPhoneNumber}</TableCell>
                <TableCell align="center">
                  <Bool value={a.isBlocked} />
                </TableCell>
                <TableCell align="center">
                  {a.blockReason || <Remove />}
                </TableCell>
                <TableCell align="center">
                  <Bool value={a.isBlockedByBot ?? false} />
                </TableCell>
                <TableCell align="center">
                  <Bool value={a.isIgnored} />
                </TableCell>
                <TableCell align="center">{a.note || <Remove />}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
