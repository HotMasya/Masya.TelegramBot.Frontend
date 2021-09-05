import * as accountEpics from './accountEpics';
import * as commandEpics from './commandEpics';
import * as botSettingsEpics from './botSettingsEpics';
import * as usersEpics from './usersEpics';
import * as agencyEpics from './agencyEpics';
import { combineEpics } from 'redux-observable';

const rootEpic = combineEpics(
  accountEpics.codeEpic,
  accountEpics.phoneEpic,
  accountEpics.getUserEpic,
  accountEpics.refreshToken,
  commandEpics.loadCommandsEpic,
  commandEpics.saveCommandsEpic,
  botSettingsEpics.loadBotSettingsEpic,
  botSettingsEpics.saveBotSettingsEpic,
  usersEpics.loadUsersEpic,
  usersEpics.saveUsersEpic,
  agencyEpics.loadAgency,
  agencyEpics.saveAgency,
);

export default rootEpic;
