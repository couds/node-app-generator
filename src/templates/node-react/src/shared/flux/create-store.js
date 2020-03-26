import { createStore as reduxCreateStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'services/history';

import helpers from './helpers';

import dummy from './state/dummy';
import loading from './state/loading';

import epics from './state/epics';

const INITIAL_STATE = {};

export const history = createHistory();

export default (initialState = INITIAL_STATE, dependencies = {}) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      ...dependencies,
    },
  });

  const store = reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      dummy: helpers.createReducer(dummy.reducers, dummy.INITIAL_STATE),
      loading: helpers.createReducer(dummy.reducers, dummy.INITIAL_STATE),
    }),
    initialState,
    compose(
      applyMiddleware(epicMiddleware, routerMiddleware(history)),
      // eslint-disable-next-line no-underscore-dangle
      (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || ((f) => f),
    ),
  );

  epicMiddleware.run(epics);

  return store;
};
