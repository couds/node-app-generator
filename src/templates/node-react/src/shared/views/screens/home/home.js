import React from 'react';
import styled from 'styled-components';

import { Trans } from '@lingui/macro';

const Container = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Home = () => {
  return (
    <Container>
      <h2>
        <Trans>This is a template/boilerplate for app&apos;s that use React for all out there that didn&apos;t like all the magic made by RCA</Trans>
      </h2>
    </Container>
  );
};

export default Home;
