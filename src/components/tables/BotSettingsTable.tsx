import {
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { BotSettings } from '../../models/BotSettings';
import SensetiveTextField from '../input/SensetiveTextField';

export type BotSettingsTableProps = {
  botSettings?: Partial<BotSettings>;
  updateSettings: (settings: Omit<Partial<BotSettings>, 'id'>) => void;
};

const BotSettingsTable: React.FC<BotSettingsTableProps> = (props) => {
  const { botSettings, updateSettings } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Bot Token</Typography>
            </TableCell>
            <TableCell width="80%">
              <SensetiveTextField
                onChange={(e) => updateSettings({ token: e.target.value })}
                value={botSettings?.token ?? ''}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Webhook host and path</Typography>
            </TableCell>
            <TableCell width="80%">
              <TextField
                value={botSettings?.webhookHost ?? ''}
                onChange={(e) =>
                  updateSettings({ webhookHost: e.target.value })
                }
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Is bot enabled?</Typography>
            </TableCell>
            <TableCell width="80%">
              <Switch
                checked={botSettings?.isEnabled ?? false}
                onChange={(_e, checked) =>
                  updateSettings({ isEnabled: checked })
                }
                color="primary"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BotSettingsTable;
