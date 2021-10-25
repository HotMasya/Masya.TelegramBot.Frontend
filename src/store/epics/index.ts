import * as accountEpics from './accountEpics';
import * as commandEpics from './commandEpics';
import * as botSettingsEpics from './botSettingsEpics';
import * as usersEpics from './usersEpics';
import * as agencyEpics from './agencyEpics';
import * as minMaxEpics from './minmaxEpics';
import * as agenciesEpics from './agenciesEpics';
import * as objectsEpics from './objectsEpics';
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
  botSettingsEpics.loadBotLogsEpic,
  botSettingsEpics.startImportsEpic,
  usersEpics.loadUsersEpic,
  usersEpics.saveUsersEpic,
  agencyEpics.loadAgencyEpic,
  agencyEpics.saveAgencyEpic,
  agencyEpics.loadImportsLogsEpic,
  minMaxEpics.loadMinMaxEpic,
  minMaxEpics.saveMinMaxEpic,
  agenciesEpics.loadAgenciesEpic,
  agenciesEpics.saveAgenciesEpic,
  objectsEpics.loadObjectsEpic,
  objectsEpics.saveObjectsEpic,
);

export default rootEpic;
