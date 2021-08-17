import { Button, Checkbox, Collapse, TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import { mapPermission } from '../../utils';
import { Command } from '../../models/Command';

export type AccordionTableRowProps = {
    command: Command;
}

const AccordionTableRow: React.FC<AccordionTableRowProps> = (props) => {
    const { command } = props;
    const [open, setOpen] = useState(false);
    // const onRowClick = () => {
    //     setO
    // };

    return (
        <>
            <TableRow key={command.id} selected={open} onClick={() => setOpen(s => !s)}>
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
            </TableRow>
            <Collapse in={open} timeout="auto">
                {command.aliases.map(a => 
                <TableRow key={a.id} selected={open}>
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
                </TableRow>
                )}
            </Collapse>
        </>
    );
}

export default AccordionTableRow;
