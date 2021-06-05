import React from 'react';
import styled from 'styled-components';
import { Trans } from '@lingui/macro';

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Trans>Loading...</Trans>
    </LoaderContainer>
  );
};

export default Loader;
