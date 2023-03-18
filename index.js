/**
 * third party libraries
 */
import express from 'express';
import cors from 'cors';

// server entry files
import {
  LoginRoute,
  BankRoute,
  RoleRoute,
  FinancialRoute,
  // EmployeeRoute,
  // ProfileRoute,
  UserRoute,
  GuarantorRoute,
  // ValorationRoute,
  SolicitationRoute,
  MeRoute
} from './src/infraestructure/routes/index.routes.js';
import { HttpLogger, Logger } from './src/infraestructure/logger/index.js';
import { errorLogger, errorResponder, invalidPathHandler } from './src/infraestructure/middlewares/error/index.js';

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
  origin: ['http://127.0.0.1:8081', 'http://127.0.0.1:5173']
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
app.use(`${apiVersion}/auth`, LoginRoute);
app.use(`${apiVersion}/banks`, BankRoute);
app.use(`${apiVersion}/financials`, FinancialRoute);
app.use(`${apiVersion}/users`, UserRoute);
app.use(`${apiVersion}/guarantors`, GuarantorRoute);
app.use(`${apiVersion}/solicitations`, SolicitationRoute);
app.use(`${apiVersion}/me`, MeRoute);
// app.use(`${apiVersion}/employees`, EmployeeRoute);
// app.use(`${apiVersion}/rejection-reasons`, ValorationRoute);

// error handlers (Last middleware to use)
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(port, () => {
  logger.info(`Listening on port: ${port}`);
});
