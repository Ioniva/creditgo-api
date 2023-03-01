import { Logger } from '../../logger/index.js';

const errorLogger = (err, req, res, next) => {
  const logger = Logger.getInstance();
  logger.error(err);
  next(err);
};

export default errorLogger;
