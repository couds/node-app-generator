import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import styled from 'styled-components';

const StoreContainer = styled.div`
  display: flex;
  padding: 2rem;
  align-items: flex-start;
  flex-direction: column;
`;

const Tabs = styled.nav`
  display: flex;
  justify-content: stretch;
  width: 100%;

  > div {
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.color.link};
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    flex: 1;
    &.is-active,
    &:hover {
      border-bottom-width: 2px;
      color: ${(props) => props.theme.color.link};
    }
  }
`;

const Button = styled.button`
  padding: 0.25rem 1rem;
  background: ${({ color, theme }) => theme.color[color] || 'white'};
  line-height: 1.5rem;
  border-radius: 1.5rem;
  outline: none;
  border: 1px solid ${({ color, theme }) => theme.color[`${color}-reverse`] || 'white'};
`;

const UserContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  img {
    margin-right: 1rem;
    border-radius: 0.5rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

const Store = ({ currentValue, ping, search, results, isLoading }) => {
  const [currentTab, setCurrentTab] = useState('ping');
  return (
    <StoreContainer>
      <Tabs>
        <div role="presentation" className={currentTab === 'ping' ? 'is-active' : ''} onClick={() => setCurrentTab('ping')}>
          <Trans>Ping Example</Trans>
        </div>
        <div role="presentation" className={currentTab === 'api' ? 'is-active' : ''} onClick={() => setCurrentTab('api')}>
          <Trans>API Call Example</Trans>
        </div>
      </Tabs>
      {currentTab === 'ping' && (
        <div>
          <Button type="button" onClick={ping} style={{ marginTop: '1rem' }}>
            PING
          </Button>
          <h1>{currentValue}</h1>
        </div>
      )}
      {currentTab === 'api' && (
        <div style={{ width: '100%' }}>
          <Button disabled={isLoading} type="button" onClick={() => search(3)} style={{ marginTop: '1rem', marginBottom: '1rem', width: '100%' }}>
            {isLoading ? 'Loading' : 'Search 3 random users'}
          </Button>
          {results.map((user) => (
            <UserContainer key={user.login.uuid}>
              <img src={user.picture.medium} alt="avatar" />
              <div className="content">
                <div>
                  {user.name.title} {user.name.first} {user.name.last}
                </div>
                <div>{user.email}</div>
              </div>
            </UserContainer>
          ))}
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
