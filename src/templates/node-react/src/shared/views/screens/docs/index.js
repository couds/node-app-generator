import { lazy } from 'react';

export default process.env.IS_SERVER ? require('./docs').default : lazy(() => import('./docs'));
