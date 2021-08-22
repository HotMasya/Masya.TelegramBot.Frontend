import {
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Command } from '../../models/Command';
import { Create, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import BottomlessTableRow from './BottomlessTableRow';
import AliasTableRow from './AliasTableRow';
import { Permission } from '../../models/User';
import AddItemTableRow from './AddItemTableRow';

export type AccordionTableRowProps = {
  command: Partial<Command>;
  open: boolean;
  onArrowClick: (buttonId: string, openedState: boolean) => void;
  onCommandChanged: (command: Partial<Command>) => void;
};

const AccordionTableRow: React.FC<AccordionTableRowProps> = (props) => {
  const { command, open, onArrowClick, onCommandChanged } = props;

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
          <Typography>{command.name}</Typography>
        </TableCell>
        <TableCell align="center">
          <Checkbox
            color="primary"
            checked={command.isEnabled || false}
            onChange={(e, checked) =>
              onCommandChanged({ id: command.id, isEnabled: checked })
            }
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            color="primary"
            checked={command.displayInMenu || false}
            onChange={(e, checked) =>
              onCommandChanged({ id: command.id, displayInMenu: checked })
            }
          />
        </TableCell>
        <TableCell align="right">
          <Select
            autoWidth
            value={command.permission}
            onChange={(event) =>
              onCommandChanged({
                id: command.id,
                permission: event.target.value as Permission,
              })
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
      {command.aliases?.map((a) => (
        <AliasTableRow
          key={a.id}
          aliasId={a.id}
          open={open}
          onCommandChanged={onCommandChanged}
        />
      ))}
      <AddItemTableRow key={"add_item_"+command.id} cellColSpan={5} open={open} />
    </>
  );
};

export default AccordionTableRow;
