import React from 'react';
import { render, hydrate } from 'react-dom';
import App from 'views/app';
import createStore from 'flux/create-store';

const isBot = JSON.parse(window.__IS_BOT__ || false);

const store = createStore(window.__INITIAL_STATE__);

try {
  const serverState = document.querySelector('#hf-initial-state');
  if (serverState) {
    serverState.parentNode.removeChild(serverState);
  }
} catch {
  console.error('could not remove server state element');
}

function boot() {
  function run() {
    if (!isBot) {
      render(<App locale={window.__LOCALE__} store={store} />, document.getElementById('react-app'));
    } else {
      import(`services/locales/${window.__LOCALE__}/messages`).then((langData) => {
        const catalogs = {
          [window.__LOCALE__]: langData.default,
        };
        // TODO: Find a way to avoid client complain about server and client not match due the lazy loading.
        hydrate(<App catalogs={catalogs} locale={window.__LOCALE__} store={store} />, document.getElementById('react-app'));
      });
    }
  }

  if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) !== -1 && document.body) {
    run();
  } else {
    document.addEventListener('DOMContentLoaded', run, false);
  }
}

if (!window.Intl) {
  import('intl').then(boot);
} else {
  boot();
}
