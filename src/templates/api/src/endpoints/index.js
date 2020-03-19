import { Router } from 'express';
import V1 from './v1';

const routes = Router();

routes.use('/v1', V1);
routes.use('/latest', V1);

export default routes;
