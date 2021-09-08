import {
  useTheme,
  Paper,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import { HeadTableCell, AccordionTableRow } from '.';
import { useCounter } from '../../hooks';
import { Command, Permission } from '../../models';

export interface CommandTableProps {
  commands: Partial<Command>[];
  updateCommand: (command: Partial<Command>) => void;
  addCommand: (command: Partial<Command>) => void;
  removeCommand: (id: number) => void;
  loading?: boolean;
}

export const CommandsTable: React.FC<CommandTableProps> = (props) => {
  const theme = useTheme();
  const { counter, next } = useCounter('commands');
  const { commands, updateCommand, addCommand, removeCommand, loading } = props;
  const [openedRowId, setOpenedRowId] = useState<string | null>(null);
  const onArrowClick = useCallback(
    (buttonId: string, openedState: boolean) => {
      setOpenedRowId(openedState ? null : buttonId);
    },
    [setOpenedRowId],
  );

  const onCommandAdd = useCallback(
    (parentId: number) => {
      const nextValue = next();
      addCommand({
        parentId: parentId,
        name: `${counter?.label}${nextValue}`,
        newAliasId: -nextValue,
        permission: Permission.User,
        isEnabled: true,
      });
    },
    [addCommand, next, counter],
  );

  const onCommandDelete = useCallback(
    (id: number) => {
      removeCommand(id);
    },
    [removeCommand],
  );

  return (
    <TableContainer component={Paper} style={{ marginTop: theme.spacing(3) }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell size="small" style={{ width: 20 }} />
            <HeadTableCell align="left" style={{ width: 200 }}>
              Name
            </HeadTableCell>
            <HeadTableCell align="center">Is Enabled</HeadTableCell>
            <HeadTableCell align="center">Display In Menu</HeadTableCell>
            <HeadTableCell align="right">Permission</HeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow key="loading_commands_progress">
              <TableCell colSpan={5}>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <CircularProgress
                    size="1.5rem"
                    color="primary"
                    style={{
                      marginRight: theme.spacing(2),
                    }}
                  />
                  Loading commands...
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            commands?.map((cmd) => (
              <AccordionTableRow
                onCommandDelete={onCommandDelete}
                onCommandAdd={onCommandAdd}
                key={cmd.id}
                command={cmd}
                onCommandChanged={updateCommand}
                onArrowClick={onArrowClick}
                open={openedRowId === 'command' + cmd.id}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
