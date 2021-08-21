import {
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Command } from '../../models/Command';
import { Create, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import BottomlessTableRow from './BottomlessTableRow';
import AliasTableRow from './AliasTableRow';
import { Permission } from '../../models/User';

export type AccordionTableRowProps = {
  command: Command;
  open: boolean;
  onArrowClick: (buttonId: string, openedState: boolean) => void;
  onCommandChanged: () => void;
};

const AccordionTableRow: React.FC<AccordionTableRowProps> = (props) => {
  const { command, open, onArrowClick } = props;
  const [commandState, setCommandState] = useState(command);

  return (
    <>
      <BottomlessTableRow key={command.id} selected={open}>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => onArrowClick('command' + command.id, open)}
            id={'command' + command.id}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography>
            {commandState.name}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Checkbox
            color="primary"
            defaultChecked={commandState.isEnabled || false}
            onChange={(e, checked) =>
              setCommandState((c) => ({ ...c, isEnabled: checked }))
            }
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            color="primary"
            defaultChecked={commandState.displayInMenu || false}
            onChange={(e, checked) =>
              setCommandState((c) => ({ ...c, displayInMenu: checked }))
            }
          />
        </TableCell>
        <TableCell align="right">
          <Select
            autoWidth
            value={commandState.permission}
            onChange={(event) =>
              setCommandState((c) => ({
                ...c,
                permission: event.target.value as Permission,
              }))
            }
            IconComponent={Create}
            disableUnderline>
            <MenuItem value={Permission.All}>Any</MenuItem>
            <MenuItem value={Permission.User}>User</MenuItem>
            <MenuItem value={Permission.Agent}>Agent</MenuItem>
            <MenuItem value={Permission.Admin}>Admin</MenuItem>
            <MenuItem value={Permission.SuperAdmin}>Super admin</MenuItem>
          </Select>
        </TableCell>
      </BottomlessTableRow>
      {command.aliases.map((a) => (
        <AliasTableRow key={a.id} alias={a} open={open} />
      ))}
      <TableRow key={'border' + command.id}>
        <TableCell style={{ padding: 0 }} colSpan={5} />
      </TableRow>
    </>
  );
};

export default AccordionTableRow;
