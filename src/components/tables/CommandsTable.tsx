import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { Command } from '../../models/Command';
import AccordionTableRow from './AccordionTableRow';
import HeadTableCell from './HeadTableCell';

export type CommandTableProps = {
  commands: Partial<Command>[];
  updateCommand: (command: Partial<Command>) => void;
  onAliasRemove: (id: number) => void;
};

const CommandsTable: React.FC<CommandTableProps> = (props) => {
  const theme = useTheme();
  const { commands, updateCommand, onAliasRemove } = props;
  const [openedRowId, setOpenedRowId] = useState<string | null>(null);
  const onArrowClick = useCallback(
    (buttonId: string, openedState: boolean) => {
      setOpenedRowId(openedState ? null : buttonId);
    },
    [setOpenedRowId],
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
          {commands &&
            commands
              .filter((cmd) => cmd.aliases && cmd.aliases.length > 0)
              .map((cmd) => (
                <AccordionTableRow
                  key={cmd.id}
                  command={cmd}
                  onCommandChanged={updateCommand}
                  onArrowClick={onArrowClick}
                  onAliasRemove={onAliasRemove}
                  open={openedRowId === 'command' + cmd.id}
                />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommandsTable;
