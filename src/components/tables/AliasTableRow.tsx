import { TableCell, Checkbox, Select, MenuItem } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import React from 'react';
import { BottomlessTableRow, EditTableCell } from '.';
import { RemoveIconButton } from '..';
import { useCommands } from '../../hooks';
import { Command, Permission } from '../../models';

export interface AliasProps {
  aliasId?: number;
  open: boolean;
  onCommandChanged: (command: Partial<Command>) => void;
  onAliasDelete: (id: number) => void;
}

export const AliasTableRow: React.FC<AliasProps> = (props) => {
  const { aliasId, open, onCommandChanged, onAliasDelete } = props;
  const { commands } = useCommands();

  const alias = commands?.find(
    (c) => c.id == aliasId || c.newAliasId == aliasId,
  );
  if (!alias) return null;

  return (
    <BottomlessTableRow
      key={aliasId}
      selected={open}
      style={{ display: open ? 'table-row' : 'none' }}>
      <TableCell>
        <RemoveIconButton
          onClick={() => onAliasDelete(aliasId ?? 0)}
          tooltipTitle="Delete alias"
        />
      </TableCell>
      <EditTableCell
        onChange={(event) =>
          onCommandChanged({
            id: alias.id ?? alias.newAliasId,
            name: event.target.value,
          })
        }
        content={alias.name ?? ''}
      />
      <TableCell align="center">
        <Checkbox
          color="primary"
          checked={alias.isEnabled ?? false}
          onChange={(e, checked) =>
            onCommandChanged({
              id: alias.id ?? alias.newAliasId,
              isEnabled: checked,
            })
          }
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          color="primary"
          checked={alias.displayInMenu ?? false}
          onChange={(e, checked) =>
            onCommandChanged({
              id: alias.id ?? alias.newAliasId,
              displayInMenu: checked,
            })
          }
        />
      </TableCell>
      <TableCell align="right">
        <Select
          autoWidth
          value={alias.permission ?? Permission.Guest}
          onChange={(event) =>
            onCommandChanged({
              id: alias.id ?? alias.newAliasId,
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
  );
};
