import * as accountEpics from './accountEpics';
import * as commandEpics from './commandEpics';
import * as botSettingsEpics from './botSettingsEpics';
import * as usersEpics from './usersEpics';
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
);

export default rootEpic;
