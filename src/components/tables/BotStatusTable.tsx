import {
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import React from 'react';
import { BotSettings } from 'src/models/BotSettings';

export type BotStatusTableProps = {
  botSettings: Partial<BotSettings>;
  loading?: boolean;
};

const BotStatusTable: React.FC<BotStatusTableProps> = (props) => {
  const { botSettings, loading } = props;
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Full Name</Typography>
            </TableCell>
            <TableCell style={{ width: '80%' }}>
              {loading ? (
                <CircularProgress
                  size="1.5rem"
                  style={{ color: theme.palette.primary.contrastText }}
                />
              ) : (
                <Typography>
                  {botSettings.botUser?.first_name}{' '}
                  {botSettings.botUser?.last_name}
                </Typography>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Link</Typography>
            </TableCell>
            <TableCell style={{ width: '80%' }}>
              {loading ? (
                <CircularProgress
                  size="1.5rem"
                  style={{ color: theme.palette.primary.contrastText }}
                />
              ) : (
                <Typography>
                  <Link
                    color="primary"
                    href={`https://t.me/${botSettings.botUser?.username}`}>
                    @{botSettings.botUser?.username}
                  </Link>
                </Typography>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Working status</Typography>
            </TableCell>
            <TableCell style={{ width: '80%' }}>
              {loading ? (
                <CircularProgress
                  size="1.5rem"
                  style={{ color: theme.palette.primary.contrastText }}
                />
              ) : botSettings.isEnabled ? (
                <Typography style={{ display: 'flex', alignItems: 'center' }}>
                  {' '}
                  <FiberManualRecord
                    style={{ color: theme.palette.success.main }}
                  />{' '}
                  Enabled
                </Typography>
              ) : (
                <Typography style={{ display: 'flex', alignItems: 'center' }}>
                  {' '}
                  <FiberManualRecord
                    style={{ color: theme.palette.error.main }}
                  />{' '}
                  Disabled
                </Typography>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BotStatusTable;
