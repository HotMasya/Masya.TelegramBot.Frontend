import { Button, TableCell, TableRow, useTheme } from '@material-ui/core';
import React from 'react';
import { AddCircleOutline } from '@material-ui/icons';

export type AddItemTableRowProps = {
    cellColSpan: number;
    open: boolean;
}

const AddItemTableRow: React.FC<AddItemTableRowProps> = (props) => {
    const { cellColSpan, open } = props;
    const theme = useTheme();
    return(
        <TableRow style={{ display: open ? 'table-row' : 'none' }} selected={open}>
            <TableCell colSpan={cellColSpan} style={{textAlign: 'center', paddingTop: 0}}>
                <Button variant="outlined" style={{color: theme.palette.common.white}}>
                    <AddCircleOutline /> Add new command
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default AddItemTableRow;
