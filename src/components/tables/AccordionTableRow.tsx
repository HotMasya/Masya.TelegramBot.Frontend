import { Button, Checkbox, Collapse, IconButton, Table, TableBody, TableCell, TableRow, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { mapPermission } from '../../utils';
import { Command } from '../../models/Command';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

export type AccordionTableRowProps = {
    command: Command;
}

export const BottomlessTableRow = withStyles({
    root: {
        '& > *':{
            borderBottom: 'unset',
        },
    },
})(TableRow);

const AccordionTableRow: React.FC<AccordionTableRowProps> = (props) => {
    const { command } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <BottomlessTableRow key={command.id} selected={open} >
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(s => !s)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{command.name}</TableCell>
                <TableCell align="center">
                    <Checkbox color="primary" checked={command.isEnabled || false} />
                </TableCell>
                <TableCell align="center">
                    <Checkbox color="primary" checked={command.displayInMenu || false} />
                </TableCell>
                <TableCell align="right">
                    {mapPermission(command.permission)}
                </TableCell>
            </BottomlessTableRow>
            {command.aliases.map(a => 
                <BottomlessTableRow key={a.id} selected={open} style={{display: open ? 'table-row' : 'none'}}>
                    <TableCell></TableCell>
                    <TableCell align="left">{a.name}</TableCell>
                    <TableCell align="center">
                        <Checkbox color="primary" checked={a.isEnabled || false} />
                    </TableCell>
                    <TableCell align="center">
                        <Checkbox color="primary" checked={a.displayInMenu || false} />
                    </TableCell>
                    <TableCell align="right">
                        {mapPermission(a.permission)}
                    </TableCell>
                </BottomlessTableRow>
            )}
            <TableRow>
                <TableCell style={{padding: 0}} colSpan={5}/>
            </TableRow>
        </>
    );
}

export default AccordionTableRow;