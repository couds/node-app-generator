import { createBrowserHistory } from 'history';

const createHistory = process.env.IS_SERVER
  ? () => {
      return {};
    }
  : createBrowserHistory;

export default createHistory;
