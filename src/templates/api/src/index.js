import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import endpoints from 'endpoints';
import logger from 'services/logger';

const app = express();

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', endpoints);

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
  logger.info(`Listening on port ${process.env.PORT || 3000}`)
});
