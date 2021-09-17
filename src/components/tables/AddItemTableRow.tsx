import { Button, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { AddCircleOutline } from '@material-ui/icons';

export interface AddItemTableRowProps {
  cellColSpan: number;
  open: boolean;
  buttonText: string;
  onClick: () => void;
  commandId: number;
}

export const AddItemTableRow: React.FC<AddItemTableRowProps> = (props) => {
  const { cellColSpan, open, buttonText, onClick, commandId } = props;

  return (
    <TableRow
      key={commandId}
      style={{ display: open ? 'table-row' : 'none' }}
      selected={open}>
      <TableCell
        colSpan={cellColSpan}
        style={{ textAlign: 'center', paddingTop: 0 }}>
        <Button onClick={onClick} variant="outlined" color="secondary">
          <AddCircleOutline /> {buttonText}
        </Button>
      </TableCell>
    </TableRow>
  );
};
