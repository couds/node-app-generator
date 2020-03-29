const get = (state) => state.dummy;
const getCurrent = (state) => get(state).current;
const getSearch = (state) => get(state).searchResult;

export default {
  get,
  getCurrent,
  getSearch,
};
