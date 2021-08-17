import { Checkbox, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { Command } from '../../models/Command';
import  { mapPermission } from '../../utils';
import AccordionTableRow from './AccordionTableRow';
import HeadTableCell from './HeadTableCell';

export type CommandsTableProps = {
    commands: Command[]
};

const CommandsTable: React.FC<CommandsTableProps> = (props) => {
    const { commands } = props;
    const theme = useTheme();
    
    return(
        <Table component={Paper} style={{marginTop: theme.spacing(3)}}>
            <TableHead>
                <TableRow>
                    <HeadTableCell align="left">Name</HeadTableCell>
                    <HeadTableCell align="center">Is Enabled</HeadTableCell>
                    <HeadTableCell align="center">Display In Menu</HeadTableCell>
                    <HeadTableCell align="right">Permission</HeadTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {commands && commands.map(
                    cmd => 
                    <AccordionTableRow command={cmd} />
                )}
            </TableBody>
        </Table>
    )
}

export default CommandsTable;
