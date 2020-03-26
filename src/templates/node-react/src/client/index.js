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

if (!isBot) {
  render(<App locale={window.__LOCALE__} store={store} />, document.getElementById('react-app'));
} else {
  import(`services/locales/messages/${window.__LOCALE__}/messages`).then((langData) => {
    const catalogs = {
      [window.__LOCALE__]: langData.default,
    };
    // TODO: Find a way to avoid client complain about server and client not match due the lazy loading.
    hydrate(<App catalogs={catalogs} locale={window.__LOCALE__} store={store} />, document.getElementById('react-app'));
  });
}
