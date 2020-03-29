import helpers from './helpers';
import dummy from './state/dummy';
import loading from './state/loading';

export default (initialState) => helpers.createStore({ dummy, loading }, initialState);
