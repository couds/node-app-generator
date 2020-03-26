import { createBrowserHistory } from 'history';

const createHistory = process.env.IS_SERVER ? () => ({}) : createBrowserHistory;

export default createHistory;
