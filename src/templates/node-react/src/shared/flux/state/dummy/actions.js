import CONSTANTS from './constants';

export default {
  ping: () => {
    return { type: CONSTANTS.PING };
  },
  pong: () => {
    return { type: CONSTANTS.PONG };
  },
  search: (total) => {
    return { type: CONSTANTS.SEARCH, payload: { total } };
  },
};
