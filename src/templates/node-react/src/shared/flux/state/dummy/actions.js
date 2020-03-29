import CONSTANTS from './constants';

export default {
  ping: () => ({ type: CONSTANTS.PING }),
  pong: () => ({ type: CONSTANTS.PONG }),
  search: (total) => ({ type: CONSTANTS.SEARCH, payload: { total } }),
};
