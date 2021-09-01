import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { Permission } from 'src/models/User';
import { UserView } from 'src/models/UserView';
import HeadTableCell from './HeadTableCell';

export type UsersTableProps = {
    users: UserView[];
}

const UsersTable: React.FC<UsersTableProps> = (props) => {
    const { users } = props;

    return (
        <TableContainer component={Paper}>
            <TableHead>
                <TableRow>
                    <HeadTableCell style={{width: '7%'}}>Id</HeadTableCell>
                    <HeadTableCell>Agency</HeadTableCell>
                    <HeadTableCell>Permission</HeadTableCell>
                    <HeadTableCell>Telegram Id</HeadTableCell>
                    <HeadTableCell>First Name</HeadTableCell>
                    <HeadTableCell>Last Name</HeadTableCell>
                    <HeadTableCell>Phone Number</HeadTableCell>
                    <HeadTableCell>Is Blocked</HeadTableCell>
                    <HeadTableCell>Block Reason</HeadTableCell>
                    <HeadTableCell>Is blocked by bot</HeadTableCell>
                    <HeadTableCell>Is Ignored</HeadTableCell>
                    <HeadTableCell>Note</HeadTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    users.map(u => 
                        <TableRow key={u.id}>
                            <TableCell>{u.id}</TableCell>
                            <TableCell>{u.agencyName ?? 'None'}</TableCell>
                            <TableCell>{Permission[u.permission]}</TableCell>
                            <TableCell>{u.telegramAccountId}</TableCell>
                            <TableCell>{u.telegramFirstName}</TableCell>
                            <TableCell>{u.telegramLastName ?? 'None'}</TableCell>
                            <TableCell>{u.telegramPhoneNumber}</TableCell>
                            <TableCell>{u.isBlocked ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{u.isBlockedByBot ?? 'None'}</TableCell>
                            <TableCell>{u.isIgnored ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{u.note ?? 'None'}</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </TableContainer>
    )
}

export default UsersTable;
