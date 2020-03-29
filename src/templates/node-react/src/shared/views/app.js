import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Router from 'services/router';
import Suspense from 'services/suspense';
import { Localization } from 'services/hooks/use-language';
import Loader from 'views/components/loader';

import Home from 'views/screens/home';
import Store from 'views/screens/store';
import Layout from 'views/components/layout';

const GlobalStyle = createGlobalStyle`
  html, body, #react-app {
    width: 100%;
    height: 100%;
    padding: 0%;
    margin: 0%;
    background: #282c34;
    color: white;
  }
`;

const theme = {
  color: {
    success: '#50B741',
    primary: '#5863FF',
    link: '#2BC0FF',
  },
};

const App = ({ catalogs, locale, store, ...props }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Localization catalogs={catalogs} locale={locale}>
        <Router {...props}>
          <Layout>
            <Suspense fallback={<Loader key="lazy-loader" />}>
              <Switch>
                <Route component={Home} path="/:lang" exact />
                <Route component={Store} path="/:lang/store" exact />
              </Switch>
            </Suspense>
          </Layout>
        </Router>
      </Localization>
    </ThemeProvider>
  </Provider>
);

App.propTypes = {
  catalogs: PropTypes.shape({}),
  locale: PropTypes.string,
  store: PropTypes.object.isRequired,
};

App.defaultProps = {
  catalogs: undefined,
  locale: 'en',
};

export default App;
