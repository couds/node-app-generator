import React from 'react';
import useragent from 'useragent';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
// eslint-disable-next-line import/named
import config, { clean } from 'config';
import favicon from 'assets/images/logo.png';
import App from 'views/app';
import createStore from 'flux/create-store';
import { loadLocale } from 'services/hooks/use-language';

const render = (req, res, next) => {
  res.render = async (initialState) => {
    const basePath = process.env.ASSETS_PATH;
    const agent = useragent.lookup(req.headers['user-agent']);
    const isBot = agent.device.toJSON().family === 'Spider' || req.query.isbot;
    const store = createStore(initialState);

    await loadLocale(req.locale);

    let preRender = { html: '', css: '' };

    if (isBot) {
      const sheet = new ServerStyleSheet();
      preRender = {
        html: renderToString(sheet.collectStyles(<App locale={req.locale} location={req.originalUrl} store={store} />)),
        css: sheet.getStyleTags(),
      };
    }

    const seo = req.seo || config.seo || { title: '', description: '', icon: favicon };

    const fullUrl = `//${req.hostname}${req.originalUrl}`;

    res.send(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

          <title>${seo.title}</title>
          <link rel="icon" href=""${seo.icon}">
          <meta name=description content="${seo.description}" />
          <meta property="og:title" content="${seo.title}" />
          <meta property="og:description" content="${seo.description}" />
          <meta property="og:image" content="${seo.icon}"/>
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="${req.locale}" />

          ${config.locales.availables
            .map((locale) => {
              return `<link rel="alternate" href="${fullUrl.replace(`/${req.locale}`, `/${locale}`)}" hreflang="${locale}" />`;
            })
            .join('\n')}

          <meta itemprop="name" content="${seo.title}">
          <meta itemprop="description" content="${seo.description}">
          <meta itemprop="image" content="${seo.icon}">

          <meta name="twitter:title" content="${seo.title}">
          <meta name="twitter:description" content="${seo.description}">
          <meta name="twitter:creator" content="@videotrackio">

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
       ${!isBot ? `<script src="${basePath}/javascripts/index.bundle.js" ></script>` : ''}
        </body>
      </html>
      `.trim(),
    );
  };
  next();
};

export default render;
