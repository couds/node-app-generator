import React from 'react';
import { Plural, Trans } from '@lingui/macro';

import Helmet from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Test</title>
      </Helmet>
      <h2>
        <Trans>This is a template/boilerplate for app&apos;s that use React for all out there that didn&apos;t like all the magic made by RCA</Trans>
      </h2>
      <p>
        <Trans>
          This is a plural test <Plural value={2} one="There's # message in your inbox" other="There are # messages in your inbox" />
        </Trans>
      </p>
    </div>
  );
};

export default Home;
