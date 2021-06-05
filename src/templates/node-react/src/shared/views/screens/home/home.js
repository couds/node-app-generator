import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Plural, Trans } from '@lingui/macro';

import logoSrc from 'assets/images/logo.png';

const Container = styled.div`
  min-height: 100vh;
  margin-top: -3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

const GlobalStyle = createGlobalStyle`
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
}
`;

const Logo = styled.img`
  height: 40vmin;
  animation: App-logo-spin infinite 20s linear;
`;

const Home = () => {
  return (
    <Container>
      <GlobalStyle />
      <Logo alt="logo" src={logoSrc} />
      <h2>
        <Trans>This is a template/boilerplate for app&apos;s that use React for all out there that didn&apos;t like all the magic made by RCA</Trans>
      </h2>
      <p>
        <Trans>
          This is a plural test <Plural value={2} one="There's # message in your inbox" other="There are # messages in your inbox" />
        </Trans>
      </p>
    </Container>
  );
};

export default Home;
