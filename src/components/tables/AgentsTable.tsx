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
import { Agent, Permission } from '../../models';
import { Remove } from '@material-ui/icons';
import { Bool, HeadTableCell, RemoveIconButton, TelegramUsername } from '..';

export interface AgentsTableProps {
  agents: Agent[];
  loading?: boolean;
  permission?: Permission;
  onRemoveClick?: (id: number) => void;
}

export const AgentsTable: React.FC<AgentsTableProps> = (props) => {
  const { agents, loading, permission, onRemoveClick } = props;
  const theme = useTheme();

  return (
    <TableContainer component={Paper} style={{ margin: theme.spacing(3, 0) }}>
      <Table>
        <TableHead>
          <TableRow>
            {permission && permission < Permission.Admin && <TableCell />}
            <HeadTableCell>Login</HeadTableCell>
            <HeadTableCell align="center">Avatar</HeadTableCell>
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
              <TableCell
                colSpan={permission && permission < Permission.Admin ? 10 : 9}>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CircularProgress size="1.5em" color="primary" />
                  &nbsp;Loading users...
                </Box>
              </TableCell>
            </TableRow>
          ) : !agents?.length ? (
            <TableRow>
              <TableCell
                colSpan={permission && permission < Permission.Admin ? 10 : 9}>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  There are no users.
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            agents?.map((a) => (
              <TableRow key={a.telegramLogin}>
                {!permission ||
                  (permission < Permission.Admin && (
                    <TableCell>
                      <RemoveIconButton
                        tooltipTitle="Remove agent"
                        onClick={() => onRemoveClick?.(a.id)}
                      />
                    </TableCell>
                  ))}
                <TableCell>
                  <TelegramUsername username={a.telegramLogin} />
                </TableCell>
                <TableCell>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <Avatar
                      src={base64ToSrc(a.telegramAvatar ?? '')}
                      alt="user avatar"
                    />
                  </Box>
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
