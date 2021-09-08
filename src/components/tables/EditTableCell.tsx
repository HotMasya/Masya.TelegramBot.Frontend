import {
  IconButton,
  TableCell,
  TextField,
  Typography,
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import React, { useState } from 'react';

export interface EditTableCellProps {
  content: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  onBlur?: () => void;
}

export const EditTableCell: React.FC<EditTableCellProps> = (props) => {
  const { content, onChange, onBlur } = props;
  const [editingName, setEditingName] = useState(false);
  const onEditBlur = () => {
    if (onBlur) onBlur();
    setEditingName(false);
  };
  return (
    <TableCell align="left">
      {editingName ? (
        <TextField
          autoFocus
          onChange={onChange}
          onBlur={onEditBlur}
          defaultValue={content}
        />
      ) : (
        <Typography>
          {content}
          <IconButton size="small" onClick={() => setEditingName(true)}>
            <Create fontSize="medium" />
          </IconButton>
        </Typography>
      )}
    </TableCell>
  );
};
