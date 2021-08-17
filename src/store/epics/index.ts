import * as accountEpics from './accountEpics';
import * as commandEpics from './commandEpics';
import { combineEpics } from 'redux-observable';

const rootEpic = combineEpics(
  accountEpics.codeEpic,
  accountEpics.phoneEpic,
  accountEpics.getUserEpic,
  accountEpics.refreshToken,
  commandEpics.loadKeyboardsEpic,
  commandEpics.saveKeyboardsEpic,
);

export default rootEpic;
