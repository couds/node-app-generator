import CONSTANTS from './constants';

const loading = ({ action, isLoading, params }) => {
  return { type: CONSTANTS.LOADING, payload: { action, isLoading, params } };
};

export default {
  loading,
};
