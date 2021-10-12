import express from 'express';
import path from 'path';
import morgan from 'morgan';
import acceptLanguage from 'accept-language';
import config from 'config';
import logger from 'services/logger';
import url from 'url';

// not isomorphic modules return  eslint error
/* eslint-disable-next-line import/no-unresolved */
import render from 'services/render';

acceptLanguage.languages(config.locales.availables);

const app = express();

app.set('trust proxy', true);
app.disable('x-powered-by');

app.use('/public', express.static(path.join(__dirname, '..', 'public/')));

app.use((req, res, next) => {
  if (!url.parse(req.url).pathname.endsWith('/')) {
    res.redirect(`${req.url}/`);
    return;
  }
  next();
});

app.use(morgan('dev'));

app.use(render);

app.use(`/:lang(${config.locales.availables.join('|')})/`, (req, res) => {
  const { lang } = req.params;
  req.locale = lang;
  res.render();
});

app.get('*', (req, res) => {
  const fallback = acceptLanguage.get(req.header('accept-language'));
  const [, lang] = req.url.split('/');

  const redirect = (lang || '').length === 2 ? req.path.replace(lang, fallback) : `/${fallback}${req.url}`;
  res.redirect(redirect);
});

app.use((err, req, res, next) => {
  const code = err.statusCode || 500;
  // Only logs server errors
  if (code >= 500) {
    logger.error(err);
  }
  res.status(code).json({ message: err.message, code });
  next();
});

app.listen(process.env.PORT || 3000, () => {
  logger.info(`listening on port ${process.env.PORT || 3000}`);
});
