import { Checkbox, MenuItem, Select, TableCell } from '@material-ui/core';
import React, { useState } from 'react';
import { Command } from '../../models/Command';
import BottomlessTableRow from './BottomlessTableRow';
import { Create } from '@material-ui/icons';
import EditTableCell from './EditTableCell';
import { useCallback } from 'react';
import { Permission } from '../../models/User';

export type AliasProps = {
  alias: Omit<Command, 'aliases'>;
  open: boolean;
};

const AliasTableRow: React.FC<AliasProps> = (props) => {
  const { alias, open } = props;
  const [aliasState, setAliasState] = useState(alias);
  const onEditBlur = useCallback(() => {
    if (aliasState.name.length === 0) {
      setAliasState((a) => ({ ...a, name: alias.name }));
    }
  }, [aliasState.name, alias.name]);

  return (
    <BottomlessTableRow
      key={alias.id}
      selected={open}
      style={{ display: open ? 'table-row' : 'none' }}>
      <TableCell></TableCell>
      <EditTableCell
        onBlur={onEditBlur}
        onChange={(event) =>
          setAliasState((a) => ({ ...a, name: event.target.value }))
        }
        content={aliasState.name}
      />
      <TableCell align="center">
        <Checkbox
          color="primary"
          defaultChecked={aliasState.isEnabled || false}
          onChange={(e, checked) =>
            setAliasState((a) => ({ ...a, isEnabled: checked }))
          }
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          color="primary"
          defaultChecked={aliasState.displayInMenu || false}
          onChange={(e, checked) =>
            setAliasState((a) => ({ ...a, displayInMenu: checked }))
          }
        />
      </TableCell>
      <TableCell align="right">
        <Select
          autoWidth
          value={aliasState.permission}
          onChange={(event) =>
            setAliasState((a) => ({
              ...a,
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
  );
};

export default AliasTableRow;
