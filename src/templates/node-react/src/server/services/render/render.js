import React from 'react';
import useragent from 'useragent';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
// eslint-disable-next-line import/named
import { clean } from 'config';

import App from 'views/app';
import createStore from 'flux/create-store';

const render = (req, res, next) => {
  res.render = (initialState) => {
    const basePath = process.env.ASSETS_PATH;
    const agent = useragent.lookup(req.headers['user-agent']);
    const isBot = agent.device.toJSON().family === 'Spider';
    const store = createStore(initialState);
    const catalogs = {
      // eslint-disable-next-line import/no-dynamic-require
      [req.locale]: require(`services/locales/messages/${req.locale}/messages`),
    };

    let preRender = { html: '', css: '' };

    if (isBot) {
      const sheet = new ServerStyleSheet();
      preRender = {
        html: renderToString(sheet.collectStyles(<App lang={req.locale} catalogs={catalogs} location={req.originalUrl} store={store} />)),
        css: sheet.getStyleTags(),
      };
    }

    res.send(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
          <link rel="icon" href="https://reactjs.org/favicon.ico">
          <link rel="preload" as="script" href="${basePath}/javascripts/vendors~index.bundle.js" />
          <link rel="preload" as="script" href="${basePath}/javascripts/index.bundle.js" />
          ${preRender.css}
        </head>
        <body>
        <div id="react-app">${preRender.html}</div>
        <script id="hf-initial-state">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          window.__IS_BOT__ = ${JSON.stringify(isBot)};
          window.__LOCALE__ = ${JSON.stringify(req.locale)};
          window.__CONFIG__ = ${JSON.stringify(clean())};
        </script>
        <script src="${basePath}/javascripts/vendors~index.bundle.js" ></script>
        <script src="${basePath}/javascripts/index.bundle.js" ></script>
        </body>
      </html>
      `.trim(),
    );
  };
  next();
};

export default render;
