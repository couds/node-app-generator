const get = (state) => state.loading;
const getField = (state, field) => get(state)[field] || { loading: false, progress: 0 };
const isLoading = (state, field) => getField(state, field).loading;
const getProgress = (state, field) => getField(state, field).progress;

export default {
  get,
  getProgress,
  isLoading,
};
