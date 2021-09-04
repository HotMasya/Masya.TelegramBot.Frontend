import {
  CircularProgress,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import GradientButton from './GradientButton';
import GlassPaper from './containers/GlassPaper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthModel, authScheme } from '../models/Auth';
import { SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('sm')]: {
        width: 400,
      },
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(4),
      },
    },
  }),
);

export type AuthFormProps = {
  caption?: string;
  apiEndpoint: string;
  className?: string;
  onSubmit: SubmitHandler<AuthModel>;
};

const AuthForm: React.FC<AuthFormProps> = (props) => {
  const { caption, className, onSubmit } = props;
  const classes = useStyles();
  const theme = useTheme();
  const accountState = useSelector((state: RootState) => state.account);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthModel>({
    resolver: yupResolver(authScheme),
  });

  return (
    <GlassPaper className={classes.root + ' ' + className}>
      <Typography variant="h4" align="center">
        {caption}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          type="text"
          id="phone"
          label="Phone"
          placeholder="+XXXXXXXXXXXX"
          margin="dense"
          error={
            errors.phone?.message != null ||
            accountState.checkPhoneError?.message != null
          }
          {...register('phone')}
          disabled={accountState.checkPhoneSuccess}
        />
        <Typography variant="caption" color="error">
          {errors.phone?.message || accountState.checkPhoneError?.message}
        </Typography>

        {accountState.checkPhoneSuccess && (
          <>
            <TextField
              fullWidth
              type="text"
              id="code"
              label="Code"
              placeholder="XXXXXX"
              margin="dense"
              error={
                errors.code?.message != null ||
                accountState.checkCodeError?.message != null
              }
              {...register('code')}
            />
            <Typography variant="caption" color="error">
              {errors.code?.message || accountState.checkCodeError?.message}
            </Typography>
          </>
        )}

        <GradientButton type="submit" fullWidth variant="contained">
          {!accountState.checkPhoneSuccess ? (
            accountState.loading ? (
              <CircularProgress
                size="1.5rem"
                style={{ color: theme.palette.primary.contrastText }}
              />
            ) : (
              'Send phone number'
            )
          ) : accountState.loading ? (
            <CircularProgress
              size="1.5rem"
              style={{ color: theme.palette.primary.contrastText }}
            />
          ) : (
            'Send confirmation code'
          )}
        </GradientButton>
      </form>
    </GlassPaper>
  );
};

export default AuthForm;
