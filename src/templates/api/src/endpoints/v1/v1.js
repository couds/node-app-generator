import { Router } from 'express';
// Thanks to the webpack configuration we can absolute import from src
import dummyService from 'services/dummy';
import myCustomMiddleware from 'services/middlewares/my-custom-middleware';
import config from 'config';

const routes = Router();

routes.use(myCustomMiddleware);

routes.get('/version', (req, res) => {
  res.json({
    version: 1,
    build: config.version,
    randomNumber: dummyService.random(),
  });
});

export default routes;
