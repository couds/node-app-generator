import { createEpicMiddleware, ofType, combineEpics } from 'redux-observable';
import { of, race, from, concat, interval, merge, throwError, timer } from 'rxjs';
import { map, mapTo, tap, takeUntil, delay, catchError, mergeMap } from 'rxjs/operators';
import axios from 'axios';
import { createStore as reduxCreateStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'services/history';

const getHandlerNames = (type) => ({
  start: type,
  success: `${type}_SUCCESS`,
  cancel: `${type}_CANCELED`,
  error: `${type}_FAILED`,
  finish: `${type}_FINISH`,
  progress: `${type}_PROGRESS`,
  retry: `${type}_RETRY`,
});

const createRequestEpicHandler = (
  type,
  handlers = {
    start: undefined,
    success: undefined,
    cancel: undefined,
    error: undefined,
    finish: undefined,
    progress: undefined,
  },
) => {
  const events = getHandlerNames(type);
  return {
    [events.start]: handlers.start,
    [events.success]: handlers.success,
    [events.cancel]: handlers.cancel,
    [events.error]: handlers.error,
    [events.finish]: handlers.finish,
    [events.progress]: handlers.progress,
  };
};

const createReducer = (actions, initialState) => (previousState = initialState, action) => {
  if (actions[action.type]) {
    return actions[action.type](previousState, action);
  }
  return previousState;
};

export const genericRetryStrategy = ({ maxRetryAttempts = 10, scalingDuration = 1000 } = {}) => (attempts$) =>
  attempts$.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (retryAttempt > maxRetryAttempts) {
        return throwError(error);
      }
      let waitFor = retryAttempt * scalingDuration;
      if (waitFor > 60000) {
        waitFor = 60000;
      }
      console.info(`Attempt ${retryAttempt}: retrying in ${waitFor}ms`);
      return timer(waitFor);
    }),
  );

/**
 *
 * @param {String} type action that will cause this stream to emit
 * @param {Object|function<Object>} params Object that will be passed to the axios function to do the request
 */
const createRequestEpic = (type, params) => (action$, state$) => {
  const handlerNames = getHandlerNames(type);
  const actions = {
    success: (data, action) => ({
      type: handlerNames.success,
      payload: data,
      context: action,
    }),
    error: (err, action) => ({
      type: handlerNames.error,
      payload: err,
      context: action,
    }),
    cancel: (action) => ({ type: handlerNames.cancel, context: action }),
    finish: (action) => ({ type: handlerNames.finish, context: action }),
    progress: (action) => ({ type: handlerNames.progress, context: action }),
    retry: (action, attempt) => ({ ...action, __attempt: attempt + 1, type: handlerNames.retry }),
  };
  return action$.pipe(
    ofType(type, handlerNames.retry),
    mergeMap((action) => {
      let progress = 0;
      const attempt = action.__attempt || 0;
      const scalingDuration = action.__scalingDuration || 1000;
      const requestData = typeof params === 'function' ? params(action, state$) : params;
      const request = axios({
        onUploadProgress: (evt) => {
          progress = evt.loaded / evt.total;
        },
        ...requestData,
      });

      const blockers$ = action$.pipe(
        ofType(handlerNames.cancel),
        tap(() => request.cancel()),
        mapTo(actions.cancel(action)),
      );

      const ajax$ = from(request).pipe(
        map((data) => actions.success(data.data, action)),
        catchError((error) => {
          if (attempt < (Number.isInteger(requestData.retries) ? requestData.retries : 10)) {
            let waitFor = attempt * scalingDuration;
            if (waitFor > 60000) {
              waitFor = 60000;
            }
            console.info(`Attempt ${attempt + 1}: retrying in ${waitFor}ms`);
            return of(actions.retry(action, attempt)).pipe(delay(waitFor));
          }
          return of(actions.error(error, action));
        }),
      );

      const finish = of(actions.finish(action)).pipe(delay(100));

      const end$ = concat(race(ajax$, blockers$), finish);

      // pull every second the progress of the upload
      const onProgres$ = interval(1000).pipe(
        map(() => actions.progress(progress)),
        takeUntil(end$),
      );

      return merge(onProgres$, end$);
    }),
  );
};

const history = createHistory();

/**
 *
 * @param {Object} storeObject
 * @param {Object} initialState
 */
const createStore = (storeObject, initialState = {}) => {
  const epicMiddleware = createEpicMiddleware();

  const reducers = Object.entries(storeObject).reduce(
    (acc, [field, storeObj]) => {
      return {
        ...acc,
        ...(storeObj.reducers && { [field]: createReducer(storeObj.reducers, storeObj.INITIAL_STATE || {}) }),
      };
    },
    {
      router: connectRouter(history),
    },
  );

  const store = reduxCreateStore(
    combineReducers(reducers),
    initialState,
    compose(
      applyMiddleware(epicMiddleware, routerMiddleware(history)),
      // eslint-disable-next-line no-underscore-dangle
      (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || ((f) => f),
    ),
  );

  const epics = Object.values(storeObject).reduce((acc, storeObj) => {
    return acc.concat(storeObj.epics ? Object.values(storeObj.epics) : []);
  }, []);
  epicMiddleware.run(combineEpics(...epics));

  return store;
};

export default {
  createRequestEpic,
  createRequestEpicHandler,
  createReducer,
  getHandlerNames,
  createStore,
};
