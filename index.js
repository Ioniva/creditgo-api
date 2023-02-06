/**
 * third party libraries
 */
import express from 'express';
import cors from 'cors';

// server entry files
import { AuthRoute, RoleRoute } from './src/infraestructure/routes/index.routes.js';
import ErrorHandler from './src/infraestructure/middlewares/errorHandler.js';

/**
 * server configuration
 */
import config from './config/index.js';

/**
 * express application
*/
const app = express();
const port = config.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:8081'
};

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors(corsOptions));

// parsing the request bodys
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// fill routes for express application
app.use('/api/v1/roles', RoleRoute);
app.use('/api/v1/auth', AuthRoute);

// error handler (Last middleware to use)
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
