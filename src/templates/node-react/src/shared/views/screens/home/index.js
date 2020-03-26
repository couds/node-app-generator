import { lazy } from 'react';

export default process.env.IS_SERVER ? require('./home').default : lazy(() => import('./home'));
