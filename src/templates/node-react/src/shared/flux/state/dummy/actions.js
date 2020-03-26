import CONSTANTS from './constants';

export default {
  ping: () => ({ type: CONSTANTS.PING }),
  pong: () => ({ type: CONSTANTS.PONG }),
  search: (term) => ({ type: CONSTANTS.SEARCH, payload: { term } }),
};
