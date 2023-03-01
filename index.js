/**
 * third party libraries
 */
import express from 'express';
import cors from 'cors';

// server entry files
import {
  AuthRoute,
  BankRoute,
  RoleRoute,
  EmployeeRoute,
  ProfileRoute
} from './src/infraestructure/routes/index.routes.js';
import { HttpLogger, Logger } from './src/infraestructure/logger/index.js';
import {
  errorLogger,
  errorResponder,
  invalidPathHandler
} from './src/infraestructure/middlewares/error/index.js';

/**
 * server configuration
 */
import config from './config/index.js';

/**
 * express application
 */
const app = express();
const port = config.PORT || 4000;

const morganMiddleware = HttpLogger.getHttpLoggerInstance();
const logger = Logger.getInstance();

const corsOptions = {
  origin: 'http://localhost:8081'
};

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors(corsOptions));

// invoke morgan middleware
app.use(morganMiddleware);

// parsing the request bodys
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// fill routes for express application
const apiVersion = '/api/v1';
app.use(`${apiVersion}/roles`, RoleRoute);
app.use(`${apiVersion}/auth`, AuthRoute);
app.use(`${apiVersion}/banks`, BankRoute);
app.use(`${apiVersion}/employees`, EmployeeRoute);
app.use(`${apiVersion}/profiles`, ProfileRoute);

// error handlers (Last middleware to use)
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(port, () => {
  logger.info(`Listening on port: ${port}`);
});
