import express from 'express';
import path from 'path';
import acceptLanguage from 'accept-language';
import morgan from 'morgan';

import config from 'config';

import logger from 'services/logger';

// not isomorphic modules return  eslint error
/* eslint-disable-next-line import/no-unresolved */
import render from 'services/render';

acceptLanguage.languages(config.locales.availables);

const app = express();

app.set('trust proxy', true);
app.disable('x-powered-by');

app.use('/public', express.static(path.join(__dirname, '..', 'public/')));
app.use(morgan('combined'));

app.use((req, res, next) => {
  const [, lang, ...rest] = req.url.split('/');
  const fallback = acceptLanguage.get(req.header('accept-language'));
  if (!lang) {
    res.redirect(`/${fallback}`);
    return;
  }
  if (!config.locales.availables.includes(lang)) {
    const url = lang.length === 2 ? ['', fallback, ...rest].join('/') : `/${fallback}${req.url}`;
    res.redirect(url);
    return;
  }
  req.locale = lang;
  next();
});

app.use(render);

app.get('*', (req, res) => {
  res.render();
});

app.use((err, req, res, next) => {
  console.log(err);
  res.end('error');
  next();
});

app.listen(process.env.PORT || 3000, () => {
  logger.info(`listening on port ${process.env.PORT || 3000}`);
});
