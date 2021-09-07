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
} from '@material-ui/core';
import React from 'react';
import { base64ToSrc } from '../../utils';
import { Agent } from '../../models/Agent';
import HeadTableCell from './HeadTableCell';
import TelegramUsername from '../TelegramUsername';

export type AgentsTableProps = {
  agents: Agent[];
  loading?: boolean;
};

const AgentsTable: React.FC<AgentsTableProps> = (props) => {
  const { agents, loading } = props;

  if (!agents) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <HeadTableCell>Login</HeadTableCell>
            <HeadTableCell>Avatar</HeadTableCell>
            <HeadTableCell>Full name</HeadTableCell>
            <HeadTableCell>Phone</HeadTableCell>
            <HeadTableCell>Blocked</HeadTableCell>
            <HeadTableCell>Block Reason</HeadTableCell>
            <HeadTableCell>Blocked by bot</HeadTableCell>
            <HeadTableCell>Ignored</HeadTableCell>
            <HeadTableCell>Note</HeadTableCell>
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
                <TableCell>{a.isBlocked}</TableCell>
                <TableCell>{a.blockReason}</TableCell>
                <TableCell>{a.isBlockedByBot}</TableCell>
                <TableCell>{a.isIgnored}</TableCell>
                <TableCell>{a.note}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AgentsTable;
