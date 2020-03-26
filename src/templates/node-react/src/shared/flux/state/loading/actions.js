import CONSTANTS from './constants';

const loading = ({ action, isLoading, params }) => ({ type: CONSTANTS.LOADING, payload: { action, isLoading, params } });

export default {
  loading,
};
