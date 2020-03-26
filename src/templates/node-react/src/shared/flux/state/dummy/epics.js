import helpers from 'flux/helpers';
import { ofType } from 'redux-observable';
import { map, delay } from 'rxjs/operators';
import CONSTANTS from './constants';
import actions from './actions';

export default {
  ping: (action$) =>
    action$.pipe(
      ofType(CONSTANTS.PING),
      delay(2000),
      map(() => actions.pong()),
    ),
  search: helpers.createRequestEpic(CONSTANTS.SEARCH, ({ payload }) => ({
    url: `https://www.npmjs.com/search/suggestions?q=${encodeURIComponent(payload.term)}`,
    method: 'get',
  })),
};
