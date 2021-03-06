import express from 'express';
import path from 'path';
import morgan from 'morgan';

import config from 'config';

import logger from 'services/logger';

// not isomorphic modules return  eslint error
/* eslint-disable-next-line import/no-unresolved */
import render from 'services/render';


const app = express();

app.set('trust proxy', true);
app.disable('x-powered-by');

app.use('/public', express.static(path.join(__dirname, '..', 'public/')));
app.use(morgan('dev'));

app.use(render);

app.get('*', (req, res) => {
  res.render();
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
