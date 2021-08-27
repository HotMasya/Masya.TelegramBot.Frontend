import {
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  TableCell,
} from '@material-ui/core';
import React from 'react';
import { Command } from '../../models/Command';
import BottomlessTableRow from './BottomlessTableRow';
import { Create } from '@material-ui/icons';
import EditTableCell from './EditTableCell';
import { Permission } from '../../models/User';
import { useCommands } from '../../hooks';
import { HighlightOff } from '@material-ui/icons';

export type AliasProps = {
  aliasId?: number;
  open: boolean;
  onCommandChanged: (command: Partial<Command>) => void;
  onAliasDelete: (id: number) => void;
};

const AliasTableRow: React.FC<AliasProps> = (props) => {
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
        <IconButton onClick={() => onAliasDelete(aliasId ?? 0)}>
          <HighlightOff />
        </IconButton>
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
            onCommandChanged({ id: alias.id ?? alias.newAliasId, isEnabled: checked })
          }
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          color="primary"
          checked={alias.displayInMenu ?? false}
          onChange={(e, checked) =>
            onCommandChanged({ id: alias.id ?? alias.newAliasId, displayInMenu: checked })
          }
        />
      </TableCell>
      <TableCell align="right">
        <Select
          autoWidth
          value={alias.permission ?? Permission.All}
          onChange={(event) =>
            onCommandChanged({
              id: alias.id ?? alias.newAliasId,
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
  );
};

export default AliasTableRow;
