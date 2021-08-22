import { Box, Button, useTheme } from '@material-ui/core';
import React from 'react';

export type UpdateSnackbarActionProps = {
    onCancelClick?: () => void;
    onSaveClick?: () => void;
}

const UpdateSnackbarAction: React.FC<UpdateSnackbarActionProps> = (props) => {
    const theme = useTheme();
    const { onCancelClick, onSaveClick } = props;
    return (
        <Box>
            <Button variant="outlined" color="secondary" onClick={onCancelClick}>Cancel</Button>
            <Button variant="contained" color="primary" style={{marginLeft: theme.spacing(1)}} onClick={onSaveClick}>Save</Button>
        </Box>
    )
}

export default UpdateSnackbarAction;
