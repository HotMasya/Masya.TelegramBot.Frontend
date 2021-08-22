import { Button, TableCell, TableRow, useTheme } from '@material-ui/core';
import React from 'react';
import { AddCircleOutline } from '@material-ui/icons';

export type AddItemTableRowProps = {
    cellColSpan: number;
    open: boolean;
    buttonText: string;
}

const AddItemTableRow: React.FC<AddItemTableRowProps> = (props) => {
    const { cellColSpan, open, buttonText } = props;
    const theme = useTheme();
    return(
        <TableRow style={{ display: open ? 'table-row' : 'none' }} selected={open}>
            <TableCell colSpan={cellColSpan} style={{textAlign: 'center', paddingTop: 0}}>
                <Button variant="outlined" style={{color: theme.palette.common.white}}>
                    <AddCircleOutline /> {buttonText}
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default AddItemTableRow;
