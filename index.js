/**
 * third party libraries
 */
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

/**
 * server configuration
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

/**
 * express application
*/
const app = express();
const server = http.Server(app);
const port = process.env.PORT || 4000

// server entry files
import { ClientRoute } from './src/infraestructure/webserver/routes/index.routes.js';

import ErrorHandler from './src/application/middlewares/error.js'

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// parsing the request bodys
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// fill routes for express application
app.use('/api/v1/clients', ClientRoute);

// error handler (Last middleware to use)
app.use(ErrorHandler);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})
