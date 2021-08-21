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

export type CommandsTableProps = {
  commands: Command[];
};

const CommandsTable: React.FC<CommandsTableProps> = (props) => {
  const { commands } = props;
  const theme = useTheme();
  const [openedRowId, setOpenedRowId] = useState<string | null>(null);
  const onArrowClick = useCallback(
    (buttonId: string, openedState: boolean) => {
      setOpenedRowId(openedState ? null : buttonId);
    },
    [setOpenedRowId],
  );

  const onCommandChanged = useCallback(() => {
    console.log('command changed');
  }, []);

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
            commands.map((cmd) => (
              <AccordionTableRow
                key={cmd.id}
                command={cmd}
                onCommandChanged={onCommandChanged}
                onArrowClick={onArrowClick}
                open={openedRowId === 'command' + cmd.id}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommandsTable;
