import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

export type SensetiveTextFieldProps = Omit<TextFieldProps, 'type'>;

export const SensetiveTextField: React.FC<SensetiveTextFieldProps> = (
  props,
) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowpassword = useCallback(
    () => setShowPassword((prevState) => !prevState),
    [setShowPassword],
  );
  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowpassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
