import React from 'react';

const Suspense = process.env.IS_SERVER
  ? ({ children }) => {
      return children;
    }
  : React.Suspense;

export default Suspense;
