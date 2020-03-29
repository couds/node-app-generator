import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Trans } from '@lingui/macro';

import logoSrc from 'assets/images/logo.png';
import Icon from 'views/components/icon/icon';

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
        <Trans>
          This is a template/boilerplate <Icon name="logo" color="primary" /> for app&apos;s that use React for all out there that didn&apos;t like
          all the magic made by RCA
        </Trans>
      </h2>
    </Container>
  );
};

export default Home;
