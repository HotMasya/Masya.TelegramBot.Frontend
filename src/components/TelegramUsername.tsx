import { Link, LinkProps, Typography } from '@material-ui/core';
import React from 'react';

export type TelegramUsernameProps = Omit<LinkProps, 'href'> & {
  username?: string;
};

const TelegramUsername: React.FC<TelegramUsernameProps> = (props) => {
  const { username, ...linkProps } = props;

  return (
    <Typography>
      <Link
        color={linkProps?.color ?? 'primary'}
        href={`https://t.me/${username}`}
        {...linkProps}>
        @{username}
      </Link>
    </Typography>
  );
};

export default TelegramUsername;
