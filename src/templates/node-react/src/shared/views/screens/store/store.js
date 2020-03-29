import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import styled from 'styled-components';

const StoreContainer = styled.div`
  display: flex;
  padding: 2rem;
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
        <div role="presentation" onClick={() => setCurrentTab('ping')}>
          <Trans>Ping Example</Trans>
        </div>
        <div role="presentation" onClick={() => setCurrentTab('api')}>
          <Trans>API Call Example</Trans>
        </div>
      </div>
      {currentTab === 'ping' && (
        <div>
          <Trans>
            Current value: <b>{currentValue}</b>
          </Trans>
          <Button type="button" onClick={ping} style={{ marginTop: '1rem' }}>
            PING
          </Button>
        </div>
      )}
      {currentTab === 'api' && (
        <div>
          <Button disabled={isLoading} type="button" onClick={() => search(3)} style={{ marginTop: '1rem' }}>
            {isLoading ? 'Loading' : 'Search 3 random users'}
          </Button>
          <code>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </code>
        </div>
      )}
    </StoreContainer>
  );
};

Store.propTypes = {
  currentValue: PropTypes.string.isRequired,
  ping: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Store;
