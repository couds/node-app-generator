import { Suspense as ReactSuspense } from 'react';

const Suspense = process.env.IS_SERVER ? ({ children }) => children : ReactSuspense;

export default Suspense;
