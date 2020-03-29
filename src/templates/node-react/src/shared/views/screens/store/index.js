import { lazy } from 'react';
import enhance from './enhance';

export default enhance(process.env.IS_SERVER ? require('./store').default : lazy(() => import('./store')));
