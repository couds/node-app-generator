import helpers from 'flux/helpers';
import CONSTANTS from './constants';

export const INITIAL_STATE = {
  current: 'pong',
  searchResult: [],
};

export default {
  [CONSTANTS.PING]: (state) => ({
    ...state,
    current: 'ping',
  }),
  [CONSTANTS.PONG]: (state) => ({
    ...state,
    current: 'pong',
  }),
  ...helpers.createRequestEpicHandler(CONSTANTS.SEARCH, {
    // Context have the initial action
    success: (state, { payload /* context */ }) => ({
      ...state,
      searchResult: payload.results,
    }),
  }),
};
