import { lazy } from 'react';

// TODO: Find a better way to do this
export default process.env.IS_SERVER ? require('./home').default : lazy(() => import('./home'));
