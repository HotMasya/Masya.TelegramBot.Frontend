import { Avatar, Button, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import CenteredBox from './containers/CenteredBox';

export type MiniProfileProps = {
  firstName: string;
  avatar?: string;
  onClick?: (event: React.MouseEvent) => void;
};

const MiniProfile: React.FC<MiniProfileProps> = (props) => {
  const { firstName, avatar, children, onClick } = props;
  const theme = useTheme();
  return (
    <CenteredBox>
      <Button onClick={onClick} style={{ textTransform: 'none' }}>
        {avatar && <Avatar src={avatar} alt={firstName} />}
        <Typography variant="h5" style={{ marginLeft: theme.spacing(2), color: theme.palette.primary.contrastText }}>
          {firstName}
        </Typography>
        {children}
      </Button>
    </CenteredBox>
  );
};

export default MiniProfile;
