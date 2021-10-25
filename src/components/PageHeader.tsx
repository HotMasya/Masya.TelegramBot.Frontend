import { Box, Typography, Button } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import React from 'react';

export interface PageHeaderProps {
  onReloadClick?: () => void;
  reloadDisabled?: boolean;
  headerText: string;
}

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { onReloadClick, headerText, reloadDisabled, children } = props;

  return (
    <>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Typography variant="h3">
          {headerText} {children}
        </Typography>

        {onReloadClick ? (
          <Button onClick={onReloadClick} disabled={reloadDisabled}>
            <Replay />
            Reload
          </Button>
        ) : null}
      </Box>
      <hr />
    </>
  );
};
