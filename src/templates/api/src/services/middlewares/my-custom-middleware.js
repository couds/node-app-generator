import logger from 'services/logger';

const myCustomMiddleware = (req, res, next) => {
  logger.info('I was here! =)');
  req.__my_custom_scope = 1;
  next();
};

export default myCustomMiddleware;
