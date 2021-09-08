import { Link, LinkProps, Typography } from '@material-ui/core';
import React from 'react';

export interface TelegramUsernameProps extends Omit<LinkProps, 'href'> {
  username?: string;
}

export const TelegramUsername: React.FC<TelegramUsernameProps> = (props) => {
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
