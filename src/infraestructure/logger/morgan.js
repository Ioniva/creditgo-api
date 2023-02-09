import morgan from 'morgan';
import { Logger } from './winston.js';

export class HttpLogger {
  static getHttpLoggerInstance () {
    const logger = Logger.getInstance();
    const stream = {
      write: (message) => logger.http(message)
    };

    const skip = () => {
      const env = process.env.NODE_ENV || 'development';
      return env !== 'development';
    };

    const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms :remote-addr', {
      stream,
      skip
    });

    return morganMiddleware;
  }
}
