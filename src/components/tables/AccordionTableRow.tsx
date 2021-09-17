import {
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  TableCell,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Create, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { Permission, Command } from '../../models';
import { useCommands } from '../../hooks';
import { BottomlessTableRow, AliasTableRow, AddItemTableRow } from '.';

export interface AccordionTableRowProps {
  command: Partial<Command>;
  open: boolean;
  onArrowClick: (buttonId: string, openedState: boolean) => void;
  onCommandChanged: (command: Partial<Command>) => void;
  onCommandAdd: (parentId: number) => void;
  onCommandDelete: (id: number) => void;
}

export const AccordionTableRow: React.FC<AccordionTableRowProps> = (props) => {
  const {
    command,
    open,
    onArrowClick,
    onCommandChanged,
    onCommandAdd,
    onCommandDelete,
  } = props;
  const { commands } = useCommands();

  if (command.parentId) return null;

  const aliases = commands?.filter((c) => c.parentId === command.id);

  return (
    <>
      <BottomlessTableRow key={command.id} selected={open}>
        <TableCell>
          <IconButton
            size="medium"
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
            <MenuItem value={Permission.Guest}>Guest</MenuItem>
            <MenuItem value={Permission.User}>User</MenuItem>
            <MenuItem value={Permission.Agent}>Agent</MenuItem>
            <MenuItem value={Permission.Admin}>Admin</MenuItem>
            <MenuItem value={Permission.SuperAdmin}>Super admin</MenuItem>
          </Select>
        </TableCell>
      </BottomlessTableRow>
      {aliases &&
        aliases?.map((a) => (
          <AliasTableRow
            onAliasDelete={onCommandDelete}
            key={a.id ?? a.newAliasId}
            aliasId={a.id ?? a.newAliasId}
            open={open}
            onCommandChanged={onCommandChanged}
          />
        ))}
      <AddItemTableRow
        commandId={command.id ?? 0}
        onClick={() => onCommandAdd(command.id ?? 0)}
        key={'add_item_' + command.id}
        cellColSpan={5}
        open={open}
        buttonText="Add new alias"
      />
    </>
  );
};
