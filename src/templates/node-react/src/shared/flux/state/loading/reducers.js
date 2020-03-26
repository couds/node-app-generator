import helpers from 'flux/helpers';
import DUMMY_CONSTANTS from 'flux/state/dummy/constants';

const initialLoading = { loading: false, progress: undefined };

export const INITIAL_STATE = {};

const loadingHelper = (type) =>
  helpers.createRequestEpicHandler(type, {
    start: (state) => ({
      ...state,
      [type]: {
        progress: 0,
        loading: true,
      },
    }),
    progress: (state, { context }) => ({
      ...state,
      [type]: {
        progress: context,
        loading: true,
      },
    }),
    finish: (state) => ({
      ...state,
      [type]: initialLoading,
    }),
  });

export default {
  ...loadingHelper(DUMMY_CONSTANTS.SEARCH),
};
