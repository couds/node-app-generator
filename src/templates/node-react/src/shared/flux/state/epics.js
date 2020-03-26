import { combineEpics } from 'redux-observable';
import DummyEpics from './dummy/epics';
import LoadingEpics from './loading/epics';

const getEpics = (obj) => Object.values(obj);

export default combineEpics(
  ...getEpics(DummyEpics),
  ...getEpics(LoadingEpics),
);
