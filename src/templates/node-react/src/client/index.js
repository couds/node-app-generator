import React from 'react';
import { render, hydrate } from 'react-dom';
import App from 'views/app';
import { loadLocale } from 'services/hooks/use-language';

const isBot = JSON.parse(window.__IS_BOT__ || false);

try {
  const serverState = document.querySelector('#hf-initial-state');
  if (serverState) {
    serverState.parentNode.removeChild(serverState);
  }
} catch {
  console.error('could not remove server state element');
}

const run = async () => {
  await Promise.all([loadLocale(window.__LOCALE__)]);
  if (!isBot) {
    render(<App locale={window.__LOCALE__} />, document.getElementById('react-app'));
  } else {
    hydrate(<App locale={window.__LOCALE__} />, document.getElementById('react-app'));
  }
};

if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) !== -1 && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
