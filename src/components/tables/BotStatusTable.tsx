import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { BotSettings } from 'src/models/BotSettings';

const BotStatusTable: React.FC<Partial<BotSettings>> = (props) => {
    const { botUser, isEnabled } = props;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography>Full Name</Typography>
                        </TableCell>
                        <TableCell style={{width: '80%'}}>
                            <Typography>
                                {botUser?.first_name} {botUser?.last_name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography>Link</Typography>
                        </TableCell>
                        <TableCell style={{width: '80%'}}>
                            <Typography>
                                <Link color="primary" href={`https://t.me/${botUser?.username}`}>@{botUser?.username}</Link>
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography>Working status</Typography>
                        </TableCell>
                        <TableCell style={{width: '80%'}}>
                            <Typography>
                                {isEnabled ? "enabled" : "disabled"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BotStatusTable;
