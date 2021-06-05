const get = (state) => {
  return state.loading;
};
const getField = (state, field) => {
  return get(state)[field] || { loading: false, progress: 0 };
};
const isLoading = (state, field) => {
  return getField(state, field).loading;
};
const getProgress = (state, field) => {
  return getField(state, field).progress;
};

export default {
  get,
  getProgress,
  isLoading,
};
