import dev from './dev.config.js';
import prod from './prod.config.js';

const env = process.env.NODE_ENV || 'development';
const config = (env === 'development') ? dev : prod;

export default config;
