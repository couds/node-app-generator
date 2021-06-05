const get = (state) => {
  return state.dummy;
};
const getCurrent = (state) => {
  return get(state).current;
};
const getSearch = (state) => {
  return get(state).searchResult;
};

export default {
  get,
  getCurrent,
  getSearch,
};
