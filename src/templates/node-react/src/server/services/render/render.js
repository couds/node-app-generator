import React from 'react';
import useragent from 'useragent';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
// eslint-disable-next-line import/named
import config, { clean } from 'config';
import App from 'views/app';
import { loadLocale } from 'services/hooks/use-language';

const render = (req, res, next) => {
  res.render = async () => {
    const basePath = process.env.ASSETS_PATH;
    const agent = useragent.lookup(req.headers['user-agent']);
    const isBot = agent.device.toJSON().family === 'Spider' || req.query.isbot;

    await loadLocale(req.locale);

    let preRender = { html: '', css: '', htmlAttributes: '', title: '', meta: '', link: '', bodyAttributes: '' };

    if (isBot) {
      const sheet = new ServerStyleSheet();
      preRender = {
        html: renderToString(sheet.collectStyles(<App locale={req.locale} location={req.originalUrl} />)),
        css: sheet.getStyleTags(),
      };
      const helmet = Helmet.renderStatic();
      preRender.htmlAttributes = helmet.htmlAttributes.toString();
      preRender.title = helmet.title.toString();
      preRender.meta = helmet.meta.toString();
      preRender.link = helmet.link.toString();
      preRender.bodyAttributes = helmet.bodyAttributes.toString();
    }

    const fullUrl = `${req.protocol}//${req.hostname}${req.originalUrl}`;

    const scrips = isBot ? [] : ['framework.bundle.js', 'commons.bundle.js', 'index.bundle.js'];

    res.send(
      `
      <!DOCTYPE html>
      <html ${preRender.htmlAttributes}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
          ${preRender.title}
          ${preRender.meta}
          ${preRender.link}
          <meta property="og:locale" content="${req.locale}" />
          ${config.locales.availables
            .map((locale) => {
              return `<link rel="alternate" href="${fullUrl.replace(`/${req.locale}`, `/${locale}`)}" hreflang="${locale}" />`;
            })
            .join('\n')}

          ${scrips
            .map((script) => {
              return `<link rel="preload" as="script" href="${basePath}/javascripts/${script}" />`;
            })
            .join('')}
          ${preRender.css}
        </head>
        <body ${preRender.bodyAttributes}>
        <div id="react-app">${preRender.html}</div>
        <script id="hf-initial-state">
          window.__IS_BOT__ = ${JSON.stringify(isBot)};
          window.__LOCALE__ = ${JSON.stringify(req.locale)};
          window.__CONFIG__ = ${JSON.stringify(clean())};
        </script>
       ${scrips
         .map((script) => {
           return `<script src="${basePath}/javascripts/${script}" ></script>`;
         })
         .join('')}
        </body>
      </html>
      `.trim(),
    );
  };
  next();
};

export default render;
