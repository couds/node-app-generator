import winston from 'winston';

export default winston.createLogger({
  level: 'info',
  defaultMeta: { service: 'project__name__' },
  transports: [
    new winston.transports.Console({
      format: winston.format.json(),
      level: process.env.LOG_LEVEL || 'info',
    }),
  ],
});
