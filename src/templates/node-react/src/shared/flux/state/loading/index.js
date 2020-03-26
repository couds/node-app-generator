import actions from './actions';
import reducers, { INITIAL_STATE } from './reducers';
import selectors from './selectors';
import epics from './epics';

export default {
  epics,
  actions,
  reducers,
  selectors,
  INITIAL_STATE,
};
