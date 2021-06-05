import helpers from 'flux/helpers';
import { ofType } from 'redux-observable';
import { map, delay } from 'rxjs/operators';
import CONSTANTS from './constants';
import actions from './actions';

export default {
  ping: (action$) => {
    return action$.pipe(
      ofType(CONSTANTS.PING),
      delay(1000),
      map(() => {
        return actions.pong();
      }),
    );
  },
  search: helpers.createRequestEpic(CONSTANTS.SEARCH, ({ payload }) => {
    return {
      url: `https://randomuser.me/api/?results=${parseInt(payload.total, 10)}`,
      method: 'get',
    };
  }),
};
