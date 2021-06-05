import helpers from './helpers';
import dummy from './state/dummy';
import loading from './state/loading';

export default (initialState) => {
  return helpers.createStore({ dummy, loading }, initialState);
};
