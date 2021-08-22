import * as accountEpics from './accountEpics';
import * as commandEpics from './commandEpics';
import { combineEpics } from 'redux-observable';

const rootEpic = combineEpics(
  accountEpics.codeEpic,
  accountEpics.phoneEpic,
  accountEpics.getUserEpic,
  accountEpics.refreshToken,
  commandEpics.loadCommandsEpic,
  commandEpics.saveCommandsEpic,
  commandEpics.removeCommandEpic,
);

export default rootEpic;
