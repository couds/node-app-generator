import { Router } from 'express';
import config from 'config';

const routes = Router();

routes.get('/version', (req, res) => {
  res.json({
    version: 1,
    build: config.version,
  });
});

export default routes;
