import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import React from 'react';
import { base64ToSrc } from '../utils';
import { Permission } from '../models/User';

export type ProfileProps = {
    avatar?: string;
    firstName: string;
    lastName?: string;
    permission: Permission;
    agencyName?: string;
    onLogOutClick?: () => void;
}

const Profile: React.FC<ProfileProps> = (props) => {
    const theme = useTheme();
    const { avatar, firstName, lastName, permission, agencyName, onLogOutClick } = props;

    return (
        <Card style={{display: 'flex'}}>
            <CardMedia
                component="img"
                src={base64ToSrc(avatar ?? "")}
                style={{width: 150}}
            />
            <CardContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 300, paddingBottom: theme.spacing(1)}}>
                <Box>
                    <Typography variant="h5" component="h5">
                        {firstName} {lastName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Permission: <b>{Permission[permission]}</b>
                    </Typography>
                    {
                        agencyName &&
                        <Typography variant="subtitle1" color="textSecondary">
                            Agency: <b>{agencyName}</b>
                        </Typography>
                    }
                </Box>
                <Box style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={onLogOutClick}>
                        <Typography variant="h5" color="error">
                            Log Out
                        </Typography>
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Profile;
