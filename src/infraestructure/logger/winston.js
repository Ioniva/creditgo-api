import { format, transports, createLogger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json } = format;

export class Logger {
    static getInstance = (service = 'General-purpose') => {
      const logger = createLogger({
        defaultMeta: { service },
        format: combine(
          timestamp(),
          json(),
          format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports: [
          new transports.Console(),
          Logger.getHttpLoggerTransport(),
          Logger.getInfoLoggerTransport(),
          Logger.getErrorLoggerTransport()
        ]
      });
      if (process.env.NODE_ENV !== 'production') {
        logger.add(
          new transports.Console({
            format: format.combine(format.colorize(), format.simple())
          })
        );
      }
      return logger;
    }

    static errorFilter = format((info, opts) => {
      return info.level === 'error' ? info : false;
    });

    static infoFilter = format((info, opts) => {
      return info.level === 'info' ? info : false;
    });

    static httpFilter = format((info, opts) => {
      return info.level === 'http' ? info : false;
    });

    static getInfoLoggerTransport = () => {
      return new DailyRotateFile({
        filename: 'logs/info-%DATE%.log',
        datePattern: 'HH-DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '14d',
        level: 'info',
        format: format.combine(Logger.infoFilter(), format.timestamp(), json())
      });
    };

    static getErrorLoggerTransport = () => {
      return new DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'HH-DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '14d',
        level: 'error',
        format: format.combine(Logger.errorFilter(), format.timestamp(), json())
      });
    };

    static getHttpLoggerTransport = () => {
      return new DailyRotateFile({
        filename: 'logs/http-%DATE%.log',
        datePattern: 'HH-DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '14d',
        level: 'http',
        format: format.combine(Logger.httpFilter(), format.timestamp(), json())
      });
    };
}