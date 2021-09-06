import { Box, Button, Typography } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import React from 'react';

export type PageHeaderProps = {
    onReloadClick?: () => void;
    reloadDisabled?: boolean;
    headerText: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    const { onReloadClick, headerText, reloadDisabled } = props;

    return (
        <>
            <Box style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h3">{headerText}</Typography>
                {
                    onReloadClick ? 
                    <Button onClick={onReloadClick} disabled={reloadDisabled}>
                        <Replay />
                        Reload
                    </Button>
                    : null
                }
            </Box>
            <hr />
        </>
    )
}

export default PageHeader;
