import React from 'react';
import PropTypes from 'prop-types';
import Suspense from 'views/components/suspense';
import { Switch, Route } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Router from 'services/router';
import { Localization } from 'services/hooks/use-language';
import Loader from 'views/components/loader';

import Layout from 'views/components/layout';
import Home from 'views/screens/home';
import Split from 'views/screens/split-screen';

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

const App = ({ locale, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Localization locale={locale}>
        <Router {...props}>
          <Layout>
            <Suspense fallback={<Loader key="lazy-loader" />}>
              <Switch>
                <Route component={Home} path="/:lang" exact />
                <Route component={Split} path="/:lang/split" exact />
              </Switch>
            </Suspense>
          </Layout>
        </Router>
      </Localization>
    </ThemeProvider>
  );
};

App.propTypes = {
  messages: PropTypes.shape({}),
  locale: PropTypes.string,
};

App.defaultProps = {
  messages: undefined,
  locale: 'en',
};

export default App;
