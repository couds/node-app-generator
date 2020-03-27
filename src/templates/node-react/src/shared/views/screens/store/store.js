import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import styled from 'styled-components';

const StoreContainer = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.25rem 1rem;
  background: ${({ color, theme }) => theme.color[color] || 'white'};
  line-height: 1.5rem;
  border-radius: 1.5rem;
  outline: none;
  border: 1px solid ${({ color, theme }) => theme.color[`${color}-reverse`] || 'white'};
`;

const Store = ({ currentValue, ping, search, results, isLoading }) => {
  const [currentTab, setCurrentTab] = useState('ping');
  return (
    <StoreContainer>
      <div>
        <Trans>
          Current value: <b>{currentValue}</b>
        </Trans>
      </div>
      <Button type="button" onClick={ping} style={{ marginTop: '1rem' }}>
        PING
      </Button>
      <Button disabled={isLoading} type="button" onClick={() => search(3)} style={{ marginTop: '1rem' }}>
        {isLoading ? 'Loading' : 'Search 3 random users'}
      </Button>
      <code>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </code>
    </StoreContainer>
  );
};

Store.propTypes = {
  currentValue: PropTypes.string.isRequired,
  ping: PropTypes.func.isRequired,
};

export default Store;
